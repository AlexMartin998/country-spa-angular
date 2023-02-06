import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCapital(query: string): Observable<Country[]> {
    // http retorna observabel - NO estoy haciendo la req aqui, xq no tengo el  .subscribe
    return (
      this.http
        .get<Country[]>(`${this.apiUrl}/capital/${query}`)
        // si atrapa el error, con el  of()  return 1 nuevo Observable con []
        .pipe(catchError((error) => of([])))
    );
  }

  searchCountry(query: string): Observable<Country[]> {
    return this.getResponse(`${this.apiUrl}/name/${query}`);
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.getResponse(`${this.apiUrl}/region/${region}`);
  }

  private getResponse(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}
