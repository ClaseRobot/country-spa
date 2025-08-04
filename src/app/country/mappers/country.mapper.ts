import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/restcountry.interface";


export class CountryMapper {
  
  // static RestCountry[] => country[]
  static mapCountryToCountryItem(item: RESTCountry): Country {
    return {
      name: item.translations['spa'].common ?? 'No spanish name',
      cca2: item.cca2,
      flag: item.flags.svg,
      flagSvg: item.flags.png,
      capital: item.capital[0],
      region: item.region,
      subRegion: item.subregion,
      population: item.population,
    }
  }

  static mapCountriesToCountryArray(items: RESTCountry[]): Country[] {
    return items.map(item => this.mapCountryToCountryItem(item))
  }
}