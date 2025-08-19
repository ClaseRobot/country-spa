import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPage {
  countryService = inject(CountryService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  query = linkedSignal(() => this.queryParam)

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if(!params.query) return of([])

        this.router.navigate(['/country/by-country'], {
          queryParams: {
            query: params.query
          }
        })

      return this.countryService.searchByCountry(params.query)
    }
  })
}
