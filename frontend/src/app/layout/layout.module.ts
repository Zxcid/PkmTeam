import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { ThankYouComponent } from './thank-you/thank-you.component';
import { HomeComponent } from './home/home.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { GoogleButtonComponent } from './login/google-button/google-button.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    GoogleButtonComponent,
    HomeComponent,
    ToolbarComponent,
    ThankYouComponent
  ],
    imports: [
        LayoutRoutingModule,
        SharedModule,
        NgOptimizedImage
    ]
})
export class LayoutModule { }
