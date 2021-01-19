import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../../properties/shared/property.model';
import { PropertyService } from '../../properties/shared/property.service';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent extends BaseResourceFormComponent<Task> {
   
    authUser: User;
    activeProperty: Property = new Property();
    residents: User[];

     //config calendar primeng
     ptBR= {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Do","Se","Te","Qu","Qu","Se","Sa"],
        monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
        monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
        today: 'Hoje',
        clear: 'Limpar',
      }

    constructor(
        protected taskService: TaskService,
        protected propertyService: PropertyService,
        protected injector: Injector,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService
    ) {
        super(injector, new Task(), taskService, 
            Task.fromJson,toastService,tokenService
        );
     }


    protected buildResourceForm(): void {
        this.resourceForm =  this.formBuilder.group({
            id:[null],
            name:[null,[Validators.required]],
            done: [false],
            date: [null],
            targetUser: [null],
            property: [null],
            user: [this.loadAuthResource()],
        })
    }

    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadActiveProperty();
        this.loadResource();
        this.loadAuthResource();
    }

    //override
    protected loadResource() {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params =>
                    this.taskService.getById(+params.get("id")))
            )
                .subscribe(
                    resource => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource);
                    },
                    error => 
                        this.toastMessagesService.loadServerErrorToast()
                );
        }
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
        return "Cadastro de nova Atividade no Imóvel";
    }

    protected editionPageTitle() :string{
        return "Edição da Atividade no Imóvel";
    }

}
