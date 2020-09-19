import { Component, Injector, OnInit } from '@angular/core';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../shared/property.model';
import { PropertyService } from '../shared/property.service';

@Component({
  selector: 'app-property-rules-form',
  templateUrl: './property-rules-form.component.html',
  styleUrls: ['./property-rules-form.component.css']
})
export class PropertyRulesFormComponent 
    extends BaseResourceFormComponent<Property>{
    
    property: Property;

    constructor(
        protected propertyService: PropertyService,
        protected injector : Injector,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService
    )
    { 
        super(
            injector, new Property(), propertyService,
            Property.fromJson,toastService,tokenService 
        );
    }
        
    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null],
            description: [null],
            landLordName: [null],
            landLordPhone: [null],
            zipCode: [null],
            street: [null],
            addressDetails: [null],
            number: [null],
            city: [null],
            state: [null],
            user: [this.loadAuthResource()],
            residents: [null],
            active: [true],
            rules: [null]
        })
    }

    //override
    protected setCurrentAction() {
        this.currentAction = "edit";
    }

    //override
    protected loadResource() {
        if (this.currentAction == "edit") {
            let user: User = this.loadAuthResource();
            this.propertyService.getCurrentActivePropertyId(user.id)
                .subscribe(
                    resource => {
                        console.log(JSON.stringify(this.property))
                        this.property = resource;
                        this.resourceForm.patchValue(this.property);
                    },
                    error => 
                        this.toastMessagesService.loadServerErrorToast()
                );
        }
    }

}
