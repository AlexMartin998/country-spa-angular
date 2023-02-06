import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent implements OnInit {
  // al inicio es null, hasta q llega al  .subscribe
  public country?: Country;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly countriesService: CountriesService,
    private readonly router: Router
  ) {}

  // override
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // cambia lo q emite el Observable
        switchMap(({ id }) =>
          this.countriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        // si no existe 1 country lo saco de la ruta
        if (!country) return this.router.navigateByUrl('');

        return (this.country = country);
      });
  }
}
