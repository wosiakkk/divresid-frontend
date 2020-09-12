import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { Invite } from './invite.model'
import { Injector, Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class InviteService extends BaseResourceService<Invite>{

    constructor(protected injector: Injector, private httpreq: HttpClient){
        super("http://localhost:4200/api/auth/invites", injector,
        Invite.fromJson, Invite.paginationFromJson);
    }

    acceptingInvitation(invite: Invite): Observable<Invite>{
        const url = `${this.apiPath}/accept`;
        return this.http.put(url,invite).pipe(
            map(() => invite,
                catchError(this.handleError)
            )
        );
    }

    /*método para ir para Residents Service*/
    findByEmail(email : string): Observable<any>{
        const urlr = `http://localhost:4200/api/auth/residents/byEmail?email=${email}`;
        return this.httpreq.get(urlr)
        
    }

}