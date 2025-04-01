import { Component, OnInit } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { ESpinnerType } from '../shared/constants/app.constants';
import { ITeamDto } from '../shared/constants/team.model';
import { SpinnerService } from '../shared/services/spinner.service';
import { TeamsService } from '../shared/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams!: Observable<ITeamDto[]>;

  constructor(
    private teamService: TeamsService,
    private spinner: SpinnerService
  ) { }

  ngOnInit(): void {
    this.getUserTeams();
    this.teams = this.teamService.teams$;
  }

  private getUserTeams(): void {
    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.getUserTeams()
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe();
  }

}
