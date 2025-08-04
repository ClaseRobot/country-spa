import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  title = 'Not Found';
  location = inject(Location)

  goBack() {
    this.location.back()
  }
}
