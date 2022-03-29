import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { IUser } from "./service";

@Injectable ({
    providedIn: 'root'
})

export class UsersService {

    users: IUser[] = [];

    private userUrl = 'https://jsonplaceholder.typicode.com/users';

    public userSubject: BehaviorSubject<IUser[]> = new BehaviorSubject(this.users)
    userData$: Observable<IUser[]> = this.userSubject.asObservable();

    setUserSubject(newValue: IUser[]) {
        this.userSubject.next(newValue)
    }

    constructor(private http: HttpClient) {}
    
    getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.userUrl)
          .pipe(
            tap(data => console.log('All: ', JSON.stringify(data))),
            tap(data => this.setUserSubject(data)),
            catchError(this.handleError)
          );
      }

    /* getAllUsers(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.userUrl)
            .pipe(
                tap(data => this.setUserSubject(data)),
                tap(data => console.log('Users API: ', JSON.stringify(data))),
                catchError(this.handleError)
            )
    } */

    handleError(err: HttpErrorResponse): Observable<never>{
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occured ${err.error.message}`
        } else {
            errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`
        }

        console.error(errorMessage);
        return throwError(errorMessage)
    }

}