import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  private getCountriesResponse(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError(() => of([]))

      // delay a partir de aqui
      // delay(1200)
    );
  }

  searchCountryByAlphaCode(alphaCode: string): Observable<Country | null> {
    // la api retorna 1 arr
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`).pipe(
      map((countries) => countries[0]),
      catchError((error) => of(null))
    );
  }

  searchCapital(query: string): Observable<Country[]> {
    // http retorna observabel - NO estoy haciendo la req aqui, xq no tengo el  .subscribe
    return (
      this.http
        .get<Country[]>(`${this.apiUrl}/capital/${query}`)
        // si atrapa el error, con el  of()  return 1 nuevo Observable con []
        .pipe(
          catchError((error) => of([]))
          // delay(1200)
        )
    );
  }

  searchCountry(query: string): Observable<Country[]> {
    return this.getCountriesResponse(`${this.apiUrl}/name/${query}`);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getCountriesResponse(`${this.apiUrl}/region/${region}`);
  }
}
