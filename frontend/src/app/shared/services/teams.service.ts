import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable, of } from "rxjs";
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { ICreateTeamRequest, ITeamDto } from '../constants/team.model';
import { SnackbarService } from './snackbar.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends AbstractAuthenticatedHttpService {
  
  constructor(http: HttpClient, auth: Auth, snackbar: SnackbarService) { 
    super(http, auth, snackbar);
  }

  checkTeamName(teamName: string): Observable<boolean> {
    return of(true);
  }

  saveTeam(team: ICreateTeamRequest): Observable<ITeamDto> {
    const url: string = environment.api.team.save;
    return this.post$(url, team);
  }
}
