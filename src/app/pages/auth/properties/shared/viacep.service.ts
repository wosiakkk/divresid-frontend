import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ViaCepService {

    constructor(private http: HttpClient){}

    getDataFromCep(cep: string){
        return this.http
            .get<any>
                ("http://localhost:4200/api/auth/cep/"+`${cep}`);
    }

}


    
    