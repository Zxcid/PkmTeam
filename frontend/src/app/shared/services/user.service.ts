import { Injectable } from '@angular/core';
import { AbstractAuthenticatedHttpService } from '../auth/abstract-authenticated-http.service';
import { Auth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../constants/user.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractAuthenticatedHttpService {

  constructor(auth: Auth, http: HttpClient, snackbar: SnackbarService) {
    super(http, auth, snackbar);
  }

  internalLogin(): Observable<IUser> {
    const url: string = environment.api.user.login;
    return this.post$<IUser>(url, null);
  }
}
