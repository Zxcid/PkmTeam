import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { Observable } from "rxjs";
import { IPokemon } from "../constants/pokemon.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  storage: Storage = inject(Storage);

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
