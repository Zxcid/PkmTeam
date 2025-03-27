import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IPokemon } from "../constants/pokemon.model";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(
    private http: HttpClient,
  ) {
  }

  searchPokemonAutocomplete(name: string): Observable<IPokemon[]> {
    const url: string = environment.api.pokemon.concat('/search-autocomplete');
    const params: HttpParams = new HttpParams()
      .append('name', name);

    return this.http.get<IPokemon[]>(url, { params: params });
  }


}
