import { Component, ChangeDetectorRef } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { InviteService } from '../shared/invite.service';
import { Invite } from '../shared/invite.model';
import { ToastMessagesService } from '../../../../shared/services/toast-messages.service';
import { TokenStorageService } from '../../../../security/services/token-storage.service';
import { User } from 'src/app/security/models/user.model';




@Component({
  selector: 'app-invite-list',
  templateUrl: './invite-list.component.html',
  styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent extends BaseResourceListComponent<Invite> {

    faSearch = faSearch;

    userAuth: User;

    cols: any[] = [
        { field: 'from', header: 'Remetente' },
        { field: 'to', header: 'Destinatário' },
        { field: 'property', header: 'Imóvel' },
        { field: 'status', header: 'Status' },
        { field: 'actions', header: 'Ações' }
    ];
  
    constructor(
        private inviteService: InviteService,
        private change: ChangeDetectorRef,
        private tokenStorage: TokenStorageService,
        private toastMessage: ToastMessagesService
    ) { 
        super(inviteService,change,toastMessage,tokenStorage);
    }

    ngOnInit(): void {
        this.userAuth = this.loadAuthResource();
        super.ngOnInit();
    }
 
}
