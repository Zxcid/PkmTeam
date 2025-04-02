import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap, tap, throwError } from 'rxjs';
import { ESpinnerType } from 'src/app/shared/constants/app.constants';
import { ESections } from 'src/app/shared/constants/routing.constants';
import { ITeamDto } from 'src/app/shared/constants/team.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TeamsService } from 'src/app/shared/services/teams.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  team!: ITeamDto;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamsService,
    private spinner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter((id): id is string => !!id),
        switchMap(id => this.teamService.getUserTeamById(+id)),
        tap((team) => console.log('team: ', team))
      )
      .subscribe(team => this.team = team);
  }

  deleteTeam() {
    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.deleteTeam(this.team.pkUserTeam)
      .subscribe({
        next: () => this.router.navigate([ESections.teams, ESections.new_team]),
        error: (error: HttpErrorResponse) => new Error(error.message),
        complete: () => this.spinner.hide()
      });
  }

}
