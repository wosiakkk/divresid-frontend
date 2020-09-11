import { Component, Injector } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../../properties/shared/property.model';
import { PropertyService } from '../../properties/shared/property.service';
import { Invite } from '../shared/invite.model';
import { InviteService } from '../shared/invite.service';

@Component({
  selector: 'app-invite-form',
  templateUrl: './invite-form.component.html',
  styleUrls: ['./invite-form.component.css']
})
export class InviteFormComponent 
    extends BaseResourceFormComponent<Invite> {

    currentProperty: Property = new Property();
    existsActiveProperty: boolean;    

    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            idFrom: [this.loadAuthResource().id],
            idTo: [null],
            idProperty: [null],
            accepted: [false],
            email: [null]
        })
    }

    constructor(
        protected injector: Injector,
        protected inviteService: InviteService,
        protected toastMessageService: ToastMessagesService,
        protected tokenStorageService: TokenStorageService,
        protected propertyService: PropertyService
    ) { 
        super(injector, new Invite, inviteService,
            Invite.fromJson, toastMessageService,tokenStorageService)
    }
    ngOnInit():void {
        this.loadCurrentActiveProperty(this.loadAuthResource().id);
        super.ngOnInit();
    }

    loadCurrentActiveProperty(userId: number){
        return this.propertyService.getCurrentActivePropertyId(userId)
            .subscribe(p => {
                this.resourceForm.controls['idProperty'].setValue(p.id)
                this.currentProperty = p;
                if(p.id != null && p.id != '')
                    this.existsActiveProperty = true;
                else
                    this.existsActiveProperty = false;
                }
            )
    }

}
