import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from "rxjs";
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { ICreateTeamRequest, ITeamDto } from '../constants/team.model';
import { ApiService } from './api.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends AbstractAuthenticatedHttpService {
  
  constructor(
    http: HttpClient, 
    auth: Auth, 
    snackbar: SnackbarService,
    private api: ApiService
  ) { 
    super(http, auth, snackbar);
  }

  checkTeamNameAvailability(teamName: string): Observable<boolean> {
    const url: string = this.api.teams.checkName();
    const params: HttpParams = new HttpParams()
      .append('name', teamName);

    return this.get$(url, { params });
  }

  saveTeam(team: ICreateTeamRequest): Observable<ITeamDto> {
    const url: string = this.api.teams.save();
    return this.post$(url, team);
  }

  deleteTeam(id: number): Observable<unknown> {
    const url: string = this.api.teams.delete(id);
    return this.delete$(url);
  }
}
