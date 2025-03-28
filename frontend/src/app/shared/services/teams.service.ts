import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, of } from "rxjs";
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { ITeam } from "../constants/team.model";
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends AbstractAuthenticatedHttpService {

  teamCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(http: HttpClient, auth: Auth, snackbar: SnackbarService) { 
    super(http, auth, snackbar);
  }

  getTeams(): Observable<ITeam[]> {
    return of([]);
  }

  checkTeamName(teamName: string): Observable<boolean> {
    return of(true);
  }

  saveTeam(team: ITeam) {}
}
