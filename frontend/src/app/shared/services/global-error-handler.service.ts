import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private injector: Injector
  ) { }

  handleError(error: any): void {
    const snackbar = this.injector.get(SnackbarService);
    const message = error?.message || 'An unknown error occurred.';
    snackbar.error(message);

    console.error('[GlobalErrorHandler] - ', error);
  }
}
