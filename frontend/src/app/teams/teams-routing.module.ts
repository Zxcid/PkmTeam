import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthGuard} from "@angular/fire/auth-guard";
import {TeamsComponent} from "./teams.component";
import {NewTeamComponent} from "./new-team/new-team.component";
import {ESections} from "../shared/constants/routing.constants";
import {redirectUnauthorizedToLogin} from "../shared/guards/redirect-to-login";

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      {
        path: ESections.new_team,
        component: NewTeamComponent,
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TeamsRoutingModule { }
