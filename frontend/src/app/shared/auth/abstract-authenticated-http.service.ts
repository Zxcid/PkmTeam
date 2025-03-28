import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { Auth as FirebaseAuth, User } from 'firebase/auth';
import { catchError, from, Observable, of, switchMap, throwError, timeout, retry } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { BackendErrorResponse, HttpMethod } from '../constants/http.constants';

export abstract class AbstractAuthenticatedHttpService {

    protected constructor(
        private http: HttpClient,
        private auth: Auth,
        private snackbar: SnackbarService
    ) { }

    // --- FETCHING TOKEN ---
    protected getAuthHeaders$(): Observable<HttpHeaders> {
        const firebaseAuth = this.auth as FirebaseAuth;
        const user: User | null = firebaseAuth.currentUser;
        return user ? from(user.getIdToken()).pipe(
            switchMap(token => of(new HttpHeaders({ Authorization: `Bearer ${token}` })))
        ) : of(new HttpHeaders());
    }

    // --- UNIVERSAL REQUEST HANDLER ---
    protected request$<T>(method: string, url: string, options: {
        body?: any,
        params?: HttpParams,
        [key: string]: any
    } = {}): Observable<any> {
        return this.getAuthHeaders$().pipe(
            switchMap(headers => this.http.request<T>(method, url, {
                ...options,
                headers
            })),
            retry(1),
            timeout(10000),
            catchError(this.handleError<T>(`${method.toUpperCase()} ${url}`))
        );
    }

    // --- HTTP METHODS OVERLOADS ---

    // GET
    protected get$<T>(url: string, options: { observe: 'response'; [key: string]: any }): Observable<HttpResponse<T>>;
    protected get$<T>(url: string, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
    protected get$<T>(url: string, options?: { observe?: 'body'; [key: string]: any }): Observable<T>;
    protected get$<T>(url: string, options: { [key: string]: any } = {}): Observable<any> {
        return this.request$<T>(HttpMethod.GET, url, options);
    }

    // POST
    protected post$<T>(url: string, body: any, options: { observe: 'response'; [key: string]: any }): Observable<HttpResponse<T>>;
    protected post$<T>(url: string, body: any, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
    protected post$<T>(url: string, body: any, options?: { observe?: 'body'; [key: string]: any }): Observable<T>;
    protected post$<T>(url: string, body: any, options: { [key: string]: any } = {}): Observable<any> {
        return this.request$<T>(HttpMethod.POST, url, { body, ...options });
    }

    // PUT
    protected put$<T>(url: string, body: any, options: { observe: 'response'; [key: string]: any }): Observable<HttpResponse<T>>;
    protected put$<T>(url: string, body: any, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
    protected put$<T>(url: string, body: any, options?: { observe?: 'body'; [key: string]: any }): Observable<T>;
    protected put$<T>(url: string, body: any, options: { [key: string]: any } = {}): Observable<any> {
        return this.request$<T>(HttpMethod.PUT, url, { body, ...options });
    }

    // DELETE
    protected delete$<T>(url: string, options: { observe: 'response'; [key: string]: any }): Observable<HttpResponse<T>>;
    protected delete$<T>(url: string, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
    protected delete$<T>(url: string, options?: { observe?: 'body'; [key: string]: any }): Observable<T>;
    protected delete$<T>(url: string, options: { [key: string]: any } = {}): Observable<any> {
        return this.request$<T>(HttpMethod.DELETE, url, options);
    }

    // PATCH
    protected patch$<T>(url: string, body: any, options: { observe: 'response'; [key: string]: any }): Observable<HttpResponse<T>>;
    protected patch$<T>(url: string, body: any, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
    protected patch$<T>(url: string, body: any, options?: { observe?: 'body'; [key: string]: any }): Observable<T>;
    protected patch$<T>(url: string, body: any, options: { [key: string]: any } = {}): Observable<any> {
        return this.request$<T>(HttpMethod.PATCH, url, { body, ...options });
    }

    // --- ERROR HANDLER ---
    protected handleError<T>(context?: string) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(`[HTTP ERROR] ${context || ''}`, error);

            const status: number = error?.status;
            const backendError: BackendErrorResponse | undefined = error?.error;
            const backendMessage: string | undefined = backendError?.message;

            let message: string = backendMessage || 'An unexpected error occurred';

            switch (status) {
                case 0:
                    message = 'Network error';
                    break;
                case 401:
                    message = backendMessage || 'Unauthorized access';
                    break;
                case 403:
                    message = backendMessage || 'Access denied';
                    break;
                case 404:
                    message = backendMessage || 'Resource not found';
                    break;
                case 500:
                    message = backendMessage || 'Internal server error';
                    break;
            }

            this.snackbar.error(`${message} (${context})`);
            return throwError(() => error);
        };
    }
}
