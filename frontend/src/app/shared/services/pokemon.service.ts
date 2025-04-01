import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Auth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { IPokemon } from "../constants/pokemon.model";
import { ApiService } from "./api.service";
import { SnackbarService } from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class PokemonService extends AbstractAuthenticatedHttpService {

  constructor(
    http: HttpClient,
    auth: Auth,
    snackbar: SnackbarService,
    private api: ApiService
  ) {
    super(http, auth, snackbar);
  }

  searchPokemonAutocomplete(name: string): Observable<IPokemon[]> {
    const url: string = this.api.pokemon.search();
    const params: HttpParams = new HttpParams()
      .append('name', name);

    return this.get$<IPokemon[]>(url, { params });
  }


}
