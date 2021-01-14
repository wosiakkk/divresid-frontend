import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
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
    canAddPhoto: boolean = false;
    base64String: string = null;

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
            user: [this.loadAuthResource()],
            image: [null],
            image64:[this.base64String]
        })
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadActiveProperty();
        this.loadResource();
        this.loadAuthResource();
        this.canAddPhotoCheck();
    }

     //override
     protected loadResource() {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params =>
                    this.inventoryService.getById(+params.get("id")))
            )
                .subscribe(
                    resource => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource);
                        this.resourceForm.controls['image64']
                            .setValue('data:image/png;base64,'+ resource.image.base64Image);
                        this.base64String = 'data:image/png;base64,'+ resource.image.base64Image;
                    },
                    error => 
                        this.toastMessagesService.loadServerErrorToast()
                );
        }
    }

    //override
    protected loadAuthResource(){
        return new User(this.tokerStorageService.getUser().id);

    }

    //override
    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new";
        else
            this.currentAction = "edit";
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

    myUploader(event) {
        let file: File = event.files[0];
        let formData:FormData = new FormData(); 
            
        if(file != null){
            formData.append("file", file);
            formData.append("idItem", this.resourceForm.controls['id'].value);
        }
        this.inventoryService.uploadFile(formData).subscribe(
            json => console.log(JSON.stringify(json))
        )
    }

    private canAddPhotoCheck(){
        if(this.currentAction === 'edit'){
            this.canAddPhoto = true;
        }
    }

     //sobrescrita dos valores default de titulos de página
    protected creationPageTitle(): string{
        return "Cadastro de novo item para Inventário";
    }

    protected editionPageTitle() :string{
        return "Edição do item do Inventário";
    }

}
