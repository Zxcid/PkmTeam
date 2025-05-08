import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { BehaviorSubject, Observable, tap } from "rxjs";
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { ITeamRequest, ITeamDto } from '../constants/team.model';
import { ApiService } from './api.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsService extends AbstractAuthenticatedHttpService {

  private teamsSubject: BehaviorSubject<ITeamDto[]> = new BehaviorSubject<ITeamDto[]>([]);
  teams$: Observable<ITeamDto[]> = this.teamsSubject.asObservable();

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

  saveTeam(team: ITeamRequest): Observable<ITeamDto> {
    const url: string = this.api.teams.save();
    return this.post$<ITeamDto>(url, team)
      .pipe(
        tap((createdTeam: ITeamDto) => {
          const current = this.teamsSubject.value;
          this.teamsSubject.next([...current, createdTeam]);
        })
      )
  }

  updateTeam(request: ITeamRequest, id: number): Observable<ITeamDto> {
    const url: string = this.api.teams.update(id);
    return this.put$<ITeamDto>(url, request);
  }

  deleteTeam(id: number): Observable<unknown> {
    const url: string = this.api.teams.delete(id);
    return this.delete$(url)
      .pipe(
        tap(() => {
          const updatedTeams = this.teamsSubject.value.filter(team => team.pkUserTeam !== id);
          this.teamsSubject.next(updatedTeams);
        })
      );
  }

  getUserTeams(): Observable<ITeamDto[]> {
    const url: string = this.api.teams.getAll();
    return this.get$<ITeamDto[]>(url)
      .pipe(
        tap((resp: ITeamDto[]) => this.teamsSubject.next(resp))
      );
  }

  getUserTeamById(id: number): Observable<ITeamDto> {
    const url: string = this.api.teams.getById(id);
    return this.get$(url);
  }
}
