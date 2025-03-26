import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout.component";
import {ESections} from "../shared/constants/routing.constants";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {redirectUnauthorizedTo, AuthGuard} from "@angular/fire/auth-guard";
import {redirectUnauthorizedToLogin} from "../shared/guards/redirect-to-login";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: ESections.layout,
        redirectTo: ESections.home,
        pathMatch: 'full'
      },
      {
        path: ESections.login,
        component: LoginComponent
      },
      {
        path: ESections.home,
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToLogin}
      },
      {
        path: ESections.teams,
        loadChildren: () => import('../teams/teams.module').then(m => m.TeamsModule),
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
export class LayoutRoutingModule { }
