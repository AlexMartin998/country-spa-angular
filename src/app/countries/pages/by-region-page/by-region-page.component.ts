import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor(private readonly countriesService: CountriesService) {}

  searchByRegion(term: string): void {
    this.countriesService.searchRegion(term).subscribe((countries) => {
      this.countries = countries;
    });
  }
}
