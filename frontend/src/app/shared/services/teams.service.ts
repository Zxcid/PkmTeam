import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { ICreateTeamRequest, ITeamDto } from '../constants/team.model';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends AbstractAuthenticatedHttpService {
  
  constructor(http: HttpClient, auth: Auth, snackbar: SnackbarService) { 
    super(http, auth, snackbar);
  }

  checkTeamNameAvailability(teamName: string): Observable<boolean> {
    const url: string = environment.api.team.check_name;
    const params: HttpParams = new HttpParams()
      .append('name', teamName);

    return this.get$(url, { params });
  }

  saveTeam(team: ICreateTeamRequest): Observable<ITeamDto> {
    const url: string = environment.api.team.save;
    return this.post$(url, team);
  }

  deleteTeam(team: any): Observable<unknown> {
    const url: string = '';
    return this.delete$(url);
  }
}
