import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

function validQueryParam(queryParam: string) : Region {
  queryParam = queryParam.toLowerCase()

  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctica': 'Antarctic'
  }

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPage {

  countryService = inject(CountryService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'
  ];


  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''

  selectedRegion = linkedSignal<Region>(() => validQueryParam(this.queryParam))

  regionResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if(!params.region) return of([])

        this.router.navigate(['/country/by-region'], {
          queryParams: {
            region: params.region
          }
        })

      return this.countryService.searchByRegion(params.region)
    }
  })
}
