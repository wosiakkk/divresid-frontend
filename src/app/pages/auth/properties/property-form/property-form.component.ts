import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Property } from '../shared/property.model';
import { PropertyService } from '../shared/property.service'
import { ToastMessagesService } from '../../../../shared/services/toast-messages.service'
import { TokenStorageService } from '../../../../security/services/token-storage.service'
import { Validators } from '@angular/forms';
import { ViaCepService } from '../shared/viacep.service'


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent extends BaseResourceFormComponent<Property> {
 
    onLoading: boolean = false;

    constructor(
        protected propertyService: PropertyService,
        protected injector: Injector,
        protected toastMessagesService: ToastMessagesService,
        protected tokenStorageService: TokenStorageService,
        private cepService: ViaCepService
    ) { 
        super(
            injector, new Property(), propertyService, Property.fromJson ,
            toastMessagesService, tokenStorageService
        );
    }

    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(3)]],
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
    //sobrescrita dos valores default de titulos de página
    protected creationPageTitle(): string{
        return "Cadastro de novo Imóvel";
    }

    protected editionPageTitle() :string{
        return "Edição do Imóvel";
    }

    getDataFromCep(){
        this.onLoading = true
        let cep = this.resourceForm.controls['zipCode'].value;
        this.cepService.getDataFromCep(cep).subscribe(
            response =>{
                this.onLoading = false;
                this.resourceForm.controls['street']
                    .setValue(response.logradouro);
                this.resourceForm.controls['city']
                    .setValue(response.localidade);
                this.resourceForm.controls['state']
                    .setValue(response.uf);
            },
            error => {
                this.toastMessagesService.loadCepApiErrorToast();
            }
        )
    }

}
