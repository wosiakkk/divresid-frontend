import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { NewPassReq } from './newpass-req.model'
import { catchError } from "rxjs/operators"
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class NewPassService {

    
    apiPath: string = "http://localhost:4200/api/auth/residents/newPass";

    constructor(private http: HttpClient){}

    newpass(newPassReq: NewPassReq): Observable<NewPassReq>{
        return this.http.post(this.apiPath, newPassReq).pipe(
            catchError(this.handleError)
        )
    }
    protected handleError(error: any): Observable<any>{
        console.log('Error na requisição =>', error);
        return throwError(error);
    }
}