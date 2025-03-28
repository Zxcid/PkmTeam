import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
//import { AuthInterceptor } from './auth/auth.interceptor';
import { PikaSpinnerComponent } from './components/pika-spinner/pika-spinner.component';
import { PokeSpinnerComponent } from './components/poke-spinner/poke-spinner.component';
import { MaterialModule } from "./modules/material.module";
import { TranslocoRootModule } from './modules/transloco-root.module';

export const SHARED_MODULES = [
  CommonModule,
  MaterialModule,
  TranslocoRootModule
];

export const SHARED_COMPONENTS = [
  PikaSpinnerComponent,
  PokeSpinnerComponent
];

@NgModule({
  declarations: [
    SHARED_COMPONENTS
  ],
  exports: [
    SHARED_MODULES,
    SHARED_COMPONENTS
  ],
  imports: [
    SHARED_MODULES
  ],
  providers: [
    // Note: AuthInterceptor has been deprecated in favor of centralized HTTP handling
    // via AbstractAuthenticatedHttpService. It is no longer registered here intentionally.
    // To re-enable it, re-add the following provider:
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class SharedModule { }
