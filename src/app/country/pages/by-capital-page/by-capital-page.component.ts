import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPage {

  countryService = inject(CountryService)
  query = signal('')

  // Con RxResource ( con Observables )
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if( !params.query ) return of([])

        return this.countryService.searchByCapital(params.query)
    }
  })

  // Usando promesas

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async({ params }) => {
  //     if( !params.query ) return []

  //     return await firstValueFrom( // permite transformar cualquier observable en una promesa
  //       this.countryService.searchByCapital(params.query)
  //     )
  //   }
  // })


  // De la manera tradicional

  // isLoading = signal(false);
  // isError = signal<string|null>(null)
  // countries = signal<Country[]>([])
  
  // onSearch(value: string): void {
  //   if(this.isLoading()) return
  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   console.log('value', value)
  //   this.countryService.searchByCapital(value)
  //     .subscribe({
  //       next:(countries) => {
  //         this.countries.set(countries)
  //         this.isLoading.set(false)
  //       },
  //       error: (err) => {
  //         console.log(err)
  //         this.isLoading.set(false)
  //         this.countries.set([])
  //         this.isError.set(err)
  //       }
  //     })
  // }
}
