import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../../properties/shared/property.model';
import { PropertyService } from '../../properties/shared/property.service';
import { InventoryService } from '../shared/inventory.service';
import { PropertyItem } from '../shared/propertyItem.model';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent 
    extends BaseResourceFormComponent<PropertyItem> {

    authUser: User;
    activeProperty: Property = new Property();
    residents: User[];

    constructor(
        protected inventoryService: InventoryService,
        protected propertyService: PropertyService,
        protected injector: Injector,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService
    ) {
        super(injector, new PropertyItem(), inventoryService,
            PropertyItem.fromJson, toastService,tokenService);
    }

    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required, Validators.minLength(3)]],
            description: [null],
            owner: [null, [Validators.required]],
            property: [null],
            user: [this.loadAuthResource()]
        })
    }

    ngOnInit(): void {
        this.loadActiveProperty();
        super.ngOnInit()
    }

    private loadActiveProperty() {
        this.authUser = this.tokenService.currentUser;
        this.propertyService
            .getCurrentActivePropertyId(this.authUser.id).subscribe(
                property => {
                    this.resourceForm.controls['property'].setValue(property);
                    this.residents = property.residents;
                },
                error => this.toastService
                    .loadErrorToast("Problema ao carregar imóvel ativo"
                        + error, "toast-bottom-center")
            )
    }


     //sobrescrita dos valores default de titulos de página
    protected creationPageTitle(): string{
        return "Cadastro de novo item para Inventário";
    }

    protected editionPageTitle() :string{
        return "Edição do item do Inventário";
    }

}
