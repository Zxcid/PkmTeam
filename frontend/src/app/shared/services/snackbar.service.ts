import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {}

  success(message: string = 'Operation completed successfully.') {
    this._snackBar.open(message, 'Close', this.config('success', 1500));
  }

  warning(message: string = 'Warning, there seems to be a problem.') {
    this._snackBar.open(message, 'Close', this.config('warning'));
  }

  error(message: string = 'Error. Something went wrong.') {
    this._snackBar.open(message, 'Close', this.config('error'));
  }

  private config(type: string, duration?: number): MatSnackBarConfig {
    return {
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: `snackbar-${type}`
    };
  }
}
