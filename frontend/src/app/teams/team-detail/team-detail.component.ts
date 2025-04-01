import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
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
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map(params => params.get('id')),
        filter((id): id is string => !!id),
        switchMap(id => this.teamService.getUserTeamById(+id))
      )
      .subscribe(team => this.team = team);
  }


}
