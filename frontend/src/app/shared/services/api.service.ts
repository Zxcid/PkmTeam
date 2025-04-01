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
    save: () => `${this.teamsBaseUrl}`,
    delete: (id: number) => `${this.teamsBaseUrl}/${id}`,
    checkName: () => `${this.teamsBaseUrl}/check`
  };

  private readonly pokemonBaseUrl: string = `${this.baseUrl}/pokemon`;
  readonly pokemon = {
    search: () => `${this.pokemonBaseUrl}/search-autocomplete`
  };
}
