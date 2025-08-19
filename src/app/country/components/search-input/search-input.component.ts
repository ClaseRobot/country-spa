import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  title = 'search input';
  placeholderParam = input<string>('Buscar')
  debounceTime = input(1000)
  
  initialValue = input<string>()

  value = output<string>()
  // linkedSignal: para cuando una signal debe ser inicializada computacionalmente
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

  debounceEffect = effect((onCleanup) => {
    console.log(this.inputValue())
    const value = this.inputValue()

    const timeout = setTimeout(() => {
      this.value.emit(value)
    }, this.debounceTime())

    onCleanup(() => {
      clearTimeout(timeout)
    })
  })
}
