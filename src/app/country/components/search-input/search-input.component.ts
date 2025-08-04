import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  title = 'search input';
  value = output<string>()
  placeholderParam = input<string>('Buscar')
}
