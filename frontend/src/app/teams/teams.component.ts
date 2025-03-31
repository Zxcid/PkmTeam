import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITeamDto } from '../shared/constants/team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams!: Observable<ITeamDto[]>;

  constructor() {}

  ngOnInit(): void {
    
  }

}
