import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ESections } from 'src/app/shared/constants/routing.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private router: Router
  ) {}

  onNavigateToNewTeam(): void {
    this.router.navigate([ESections.teams, ESections.new_team]).then(() => {});
  }

}
