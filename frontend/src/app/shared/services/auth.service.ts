import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone, Optional } from '@angular/core';
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
import { Observable, catchError, map, of, shareReplay, switchMap } from "rxjs";
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
  readonly user$!: Observable<IUser | null>;

  constructor(
    @Optional() private auth: Auth,
    private router: Router,
    private http: HttpClient,
    private snackbar: SnackbarService,
    private ngZone: NgZone
  ) {
    this.user$ = this.ngZone.run(() => this.createUserStream()); //ngZone wrapper is used because angular fire auth stream has the nasty habit to run outside angular zone.
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
        this.router.navigate([AppRoutingBuilder.fullPath([ESections.login])]).then(r => { });
      }
    ).catch((error) => {
      console.error('sign out error: ' + error);
    })
  }

  private createUserStream(): Observable<IUser | null> {
    return user(this.auth).pipe(
      switchMap((fbUser: User | null) => {
        if (fbUser) {
          return this.http.post<IUser>(environment.api.user.login, null)
            .pipe(
              map((backendUser: IUser) => ({
                uid: fbUser.uid,
                img: fbUser.photoURL || '',
                role: backendUser.role
              })),
              catchError(err => {
                this.snackbar.error(err.error);
                return of(null);
              })
            );
        } else {
          return of(null);
        }
      }),
      shareReplay(1) // this prevents the auth stream to be called for every subscriber. It will just replay its first value.
    );
  }
}
