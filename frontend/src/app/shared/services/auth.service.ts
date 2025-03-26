import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  OAuthCredential,
  User,
  UserCredential,
  signInWithPopup,
  signOut,
  user
} from "@angular/fire/auth";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, catchError, of, switchMap, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import { AppRoutingBuilder } from "../classes/app-routing-builder";
import { ESections } from "../constants/routing.constants";
import { IUser } from "../constants/user.constants";
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private provider: GoogleAuthProvider = new GoogleAuthProvider();

  // observable that is updated when the auth state changes
  user$: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private http: HttpClient,
    private snackbar: SnackbarService
  ) {
    user(this.auth)
      .pipe(
        switchMap((user: User | null) => {
          if (user) {
            return this.innerLogin().pipe(
              switchMap((loggedUser: IUser) => {
                const finalUser: IUser = {
                  img: user.photoURL || '',
                  uid: user.uid,
                  role: loggedUser.role
                };
                return of(finalUser);
              })
            );
          } else {
            return of(null);
          }
        }),
        tap((user) => console.log('[AuthService] - user: ', user)),
        catchError((error: HttpErrorResponse) => {
          const err = error.error;
          this.snackbar.error(err.message);
          return of(null);
        })
      )
      .subscribe((user: IUser | null) => this.user$.next(user) );
  }

  login(): void {
    signInWithPopup(this.auth, this.provider)
      .then((result: UserCredential) => {
        const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result);
        this.router.navigate([AppRoutingBuilder.fullPath([ESections.home])]).then(r => { });
        return credential;
      })
  }

  logout(): void {
    signOut(this.auth).then(
      () => {
        this.user$.next(null);
        this.router.navigate([AppRoutingBuilder.fullPath([ESections.login])]).then(r => { });
      }
    ).catch((error) => {
      console.error('sign out error: ' + error);
    })
  }

  private innerLogin(): Observable<IUser> {
    const url: string = environment.api.user.login;

    return this.http.post<IUser>(url, null);
  }

}
