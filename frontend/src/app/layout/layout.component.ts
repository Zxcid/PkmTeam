import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { distinctUntilChanged, filter, Subject, take, takeUntil } from "rxjs";
import { ESections } from "../shared/constants/routing.constants";
import { ITeam } from "../shared/constants/team.model";
import { IUser } from "../shared/constants/user.constants";
import { AuthService } from "../shared/services/auth.service";
import { TeamsService } from "../shared/services/teams.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  user: IUser | null = null;
  destroy$: Subject<boolean> = new Subject();
  teams!: ITeam[];

  constructor(
    private auth: AuthService,
    private teamsService: TeamsService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((prev, curr) => 
          prev?.uid === curr?.uid && prev?.role === curr?.role // Confronto sicuro
        )
      )
      .subscribe((user: IUser | null) => {
        this.user = user ? { ...user } : null;
        this.cdr.detectChanges();
      });

    this.teamsService.getTeams()
      .pipe(
        take(1),
        filter((teams: ITeam[]) => teams.length > 0)
      )
      .subscribe((teams: ITeam[]) => this.teams = teams);
  }

  onLogout(): void {
    this.auth.logout();
  }

  onNavigateToNewTeam(): void {
    this.router.navigate([ESections.teams, ESections.new_team]).then(() => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
