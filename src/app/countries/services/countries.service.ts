import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { CacheStore, Country, Region } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadToLocalStorage() {
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!);
  }

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

  searchCapital(term: string): Observable<Country[]> {
    // http retorna observabel - NO estoy haciendo la req aqui, xq no tengo el  .subscribe
    return (
      this.http
        .get<Country[]>(`${this.apiUrl}/capital/${term}`)
        // si atrapa el error, con el  of()  return 1 nuevo Observable con []
        .pipe(
          catchError((error) => of([])),
          // delay(1200)
          tap((countries) => (this.cacheStore.byCapital = { term, countries })),
          tap(() => this.saveToLocalStorage())
        )
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.getCountriesResponse(`${this.apiUrl}/name/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCountries = { term, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.getCountriesResponse(`${this.apiUrl}/region/${region}`).pipe(
      // alimenta el storage del service para q no se pierda la data entre paginas
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }
}
