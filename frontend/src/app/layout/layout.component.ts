import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { filter, take } from "rxjs";
import { ESections } from "../shared/constants/routing.constants";
import { ITeam } from "../shared/constants/team.model";
import { TeamsService } from "../shared/services/teams.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  teams!: ITeam[];

  constructor(
    private teamsService: TeamsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.teamsService.getTeams()
      .pipe(
        take(1),
        filter((teams: ITeam[]) => teams.length > 0)
      )
      .subscribe((teams: ITeam[]) => this.teams = teams);
  }

  onNavigateToNewTeam(): void {
    this.router.navigate([ESections.teams, ESections.new_team]).then(() => {});
  }

  ngOnDestroy(): void {
  }
}
