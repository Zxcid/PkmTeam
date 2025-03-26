import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { NewTeamComponent } from './new-team/new-team.component';
import { TeamMemberCardComponent } from './new-team/team-member-card/team-member-card.component';
import { TeamsRoutingModule } from "./teams-routing.module";
import { TeamsComponent } from './teams.component';


@NgModule({
  declarations: [
    TeamsComponent,
    NewTeamComponent,
    TeamMemberCardComponent
  ],
  imports: [
    SharedModule, 
    TeamsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeamsModule {
}
