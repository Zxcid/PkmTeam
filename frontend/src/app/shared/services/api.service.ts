import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl: string = environment.baseUrl;

  private readonly userBaseUrl: string = `${this.baseUrl}/user`;
  readonly user = {
    login: () => `${this.userBaseUrl}/login`
  };

  private readonly teamsBaseUrl: string = `${this.baseUrl}/teams`;
  readonly teams = {
    getAll: () => `${this.teamsBaseUrl}`,
    getById: (id: number) => `${this.teamsBaseUrl}/${id}`,
    save: () => `${this.teamsBaseUrl}`,
    update: (id: number) => `${this.teamsBaseUrl}/${id}`,
    delete: (id: number) => `${this.teamsBaseUrl}/${id}`,
    checkName: () => `${this.teamsBaseUrl}/check`
  };

  private readonly pokemonBaseUrl: string = `${this.baseUrl}/pokemon`;
  readonly pokemon = {
    search: () => `${this.pokemonBaseUrl}/search-autocomplete`,
    abilities: () => `${this.pokemonBaseUrl}/abilities`,
    natures: () => `${this.pokemonBaseUrl}/natures`
  };
}
