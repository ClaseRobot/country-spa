// https://restcountries.com/v3.1/capital/tallinn
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, catchError, throwError, delay, of, tap } from "rxjs";
import { RESTCountry } from "../interfaces/restcountry.interface";
import { Country } from "../interfaces/country.interface";
import { CountryMapper } from "../mappers/country.mapper";
import { Region } from "../interfaces/region.interface";

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient)
  private queryCacheCapital = new Map<string, Country[]>()
  private queryCacheCountry = new Map<string, Country[]>()
  private queryCacheRegion = new Map<Region, Country[]>()

  searchByCapital(query : string): Observable<Country[]> {
    query = query.toLowerCase()

    if(this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!) // lo convierto en observable con of para poder subscribirme
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map( restCountries => CountryMapper.mapCountriesToCountryArray(restCountries)),
        tap( (countries) => this.queryCacheCapital.set(query, countries)), // seteo en cache la busqueda
        catchError((error => {
          console.log(error)
          return throwError(() => new Error(`No se pudo encontrar capital con el nombre ${query}`))
        }))
      )
  }

  searchByCountry(query : string): Observable<Country[]> {
    query = query.toLowerCase()

    if(this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!)
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map( restCountries => CountryMapper.mapCountriesToCountryArray(restCountries)),
        tap( (countries) => this.queryCacheCountry.set(query, countries)),
        delay(3000),
        catchError((error => {
          console.log(error)
          return throwError(() => new Error(`No se pudo encontrar pais con el nombre ${query}`))
        }))
      )
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${API_URL}/region/${region}`

    if(this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region)!)
    }

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapCountriesToCountryArray(restCountries)),
        catchError((error) => {
          console.log(error)
          return throwError(() => new Error(`No se pudo encontrar region con el nombre ${region}`))
        })
      )
  }

  searchCountryByAlphaCode(code : string): Observable<Country[]> {
    const url = `${API_URL}/alpha/${code}`

    return this.http.get<RESTCountry[]>(url)
      .pipe(
        map( restCountries => CountryMapper.mapCountriesToCountryArray(restCountries)),
        // map( (countries) => countries.at(0)),
        map( (countries) => countries.length > 0 ? [countries[0]] : []),
        catchError((error) => {
          console.log(error)
          return throwError(() => new Error(`No se pudo encontrar el pais con el codigo ${code}`))
        }))
    }  
}