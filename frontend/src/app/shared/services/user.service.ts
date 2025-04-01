import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { IUser } from '../constants/user.constants';
import { ApiService } from './api.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractAuthenticatedHttpService {

  constructor(
    auth: Auth, 
    http: HttpClient, 
    snackbar: SnackbarService,
    private api: ApiService
  ) {
    super(http, auth, snackbar);
  }

  internalLogin(): Observable<IUser> {
    const url: string = this.api.user.login();
    return this.post$<IUser>(url, null);
  }
}
