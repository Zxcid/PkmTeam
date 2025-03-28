import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { from, Observable, switchMap, take } from 'rxjs';

/**
 * This interceptor has been disabled in favor of a centralized HTTP handling
 * approach using the abstract class {@link AbstractAuthenticatedHttpService}.
 *
 * Reasons for this design choice:
 * - Greater control over token propagation and header management
 * - Custom error handling (e.g., snackbar notifications, logging)
 * - Cleaner and more consistent use of HTTP methods (`get$`, `post$`, etc.)
 * - Improved testability and maintainability (no hidden logic in interceptors)
 *
 * This class is retained for illustrative purposes or potential future reference.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: Auth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return user(this.auth).pipe(
      take(1),
      switchMap(firebaseUser => {
        if (firebaseUser) {
          return from(firebaseUser.getIdToken()).pipe(
            take(1),
            switchMap(token => {
              const cloned = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                }
              });
              return next.handle(cloned);
            })
          );
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
