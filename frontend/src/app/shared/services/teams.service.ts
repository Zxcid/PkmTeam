import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {ITeam} from "../constants/team.model";
import {Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  teamCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private firestore: Firestore) { }

  getTeams(): Observable<ITeam[]> {
    // const teamCollection =  collection(this.firestore, 'teams');
    // return collectionData<ITeam>(teamCollection);
    return of([]);
  }

  checkTeamName(teamName: string): Observable<boolean> {
    return of(true);
  }

  saveTeam(team: ITeam) {}
}
