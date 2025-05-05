import { NgModule } from "@angular/core";
import { AuthGuard } from "@angular/fire/auth-guard";
import { RouterModule, Routes } from "@angular/router";
import { ESections } from "../shared/constants/routing.constants";
import { redirectUnauthorizedToLogin } from "../shared/guards/redirect-to-login";
import { NewTeamComponent } from "./new-team/new-team.component";
import { TeamsComponent } from "./teams.component";

const routes: Routes = [
  {
    path: '',
    component: TeamsComponent,
    children: [
      {
        path: '',
        redirectTo: ESections.new_team,
        pathMatch: 'full'
      },
      {
        path: ESections.new_team,
        component: NewTeamComponent,
        canActivate: [AuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: ':id',
        component: NewTeamComponent,
        canActivate: [AuthGuard],
        data: { authGuadPipe: redirectUnauthorizedToLogin }
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
