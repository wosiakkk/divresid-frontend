import { Component, Injector } from '@angular/core';
import { Role } from 'src/app/security/models/role.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Resident } from '../shared/resident.model';
import { ResidentService } from '../shared/resident.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-resident-form',
  templateUrl: './resident-form.component.html',
  styleUrls: ['./resident-form.component.css']
})
export class ResidentFormComponent 
    extends BaseResourceFormComponent<Resident> {

    role: Role= new Role();
  
    constructor(
        protected residentService: ResidentService,
        protected injector: Injector,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService,
        protected router: Router
    ){
        super(injector, new Resident(),
            residentService, Resident.fromJson,
            toastService,tokenService);
     }

    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id:[null],
            name:[null],
            roles:[[null]]
        })
    }

    //override
    submitForm() {
        this.submittingForm = true;
        this.updateResource();
    }

    //override
    protected updateResource() {
        const resident: Resident = Resident.fromJsonToRoleUpdate(this.resourceForm.value);
        console.log("cacaca: " +JSON.stringify(this.resourceForm.value))
        this.residentService.setNewRole(resident)
            .subscribe(
                resident => this.actionsForSuccess(resident),
                error => this.actionsForError(error)
            )
        this.router.navigate(['residents']);
    }

    //override
    protected actionsForSuccess(resident: Resident) {
        this.currentAction === 'new' ? 
            this.toastMessagesService.loadCreatedResourceSuccess() : 
            this.toastMessagesService.loadUpdateResourceSuccess();
    
        const baseComponentPath: string = 
            this.route.snapshot.parent.url[0].path;

        this.router.navigateByUrl(baseComponentPath);
        
    }

    //sobrescrita dos valores default de titulos de página
    protected creationPageTitle(): string{
      return "Alterar permissão de morador";
    }
  
    protected editionPageTitle() :string{
      return "Alterar permissão de morador";
    }

}
