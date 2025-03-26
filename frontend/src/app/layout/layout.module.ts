import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {LoginComponent} from './login/login.component';
import {SharedModule} from "../shared/shared.module";
import { GoogleButtonComponent } from './login/google-button/google-button.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    GoogleButtonComponent,
    HomeComponent,
    ToolbarComponent
  ],
    imports: [
        LayoutRoutingModule,
        SharedModule,
        NgOptimizedImage
    ]
})
export class LayoutModule { }
