import { BaseResourceService } from '../../../../shared/services/base-resource.service'
import { Invite } from './invite.model'
import { Injector, Injectable } from '@angular/core'


@Injectable({
    providedIn: 'root'
})
export class InviteService extends BaseResourceService<Invite>{

    constructor(protected injector: Injector){
        super("http://localhost:4200/api/auth/invites", injector,
        Invite.fromJson, Invite.paginationFromJson);
    }

}