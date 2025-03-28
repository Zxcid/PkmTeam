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
import { Observable, map, of, shareReplay, switchMap } from "rxjs";
import { AppRoutingBuilder } from "../classes/app-routing-builder";
import { ESections } from "../constants/routing.constants";
import { IUser } from "../constants/user.constants";
import { UserService } from './user.service';

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
    private userService: UserService
  ) {
    this.user$ = this.createUserStream();
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
          return this.userService.internalLogin()
            .pipe(
              map((backendUser: IUser) => ({
                uid: fbUser.uid,
                img: fbUser.photoURL || '',
                role: backendUser.role
              }))
            );
        } else {
          return of(null);
        }
      }),
      shareReplay(1) // this prevents the auth stream to be called for every subscriber. It will just replay its first value.
    );
  }
}
