import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceService } from '../../services/base-resource.service';
import { switchMap } from 'rxjs/operators';
import toastr from "toastr";



export abstract class BaseResourceFormComponent<T extends BaseResourceModel>
     implements OnInit, AfterContentChecked {

    currentAction: string;
    resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;

    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;

    //sobrescrita para definir campos específicos nos forms filhos
    protected abstract buildResourceForm(): void

    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
    }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }
    ngOnInit(): void {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    //tratando a submition do form new ou update
    submitForm() {
        this.submittingForm = true;

        if (this.currentAction == "new")
            this.createResource();
        else
            this.updateResource();
    }

    //Métodos protegidos

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == "new")
            this.currentAction = "new";
        else
            this.currentAction = "edit";
    }

    //carregando recurso para edição
    protected loadResource() {
        if (this.currentAction == "edit") {
            this.route.paramMap.pipe(
                switchMap(params =>
                    this.resourceService.getById(+params.get("id")))
            )
                .subscribe(
                    resource => {
                        this.resource = resource;
                        this.resourceForm.patchValue(resource);
                    },
                    error => 
                        alert('Ocorreu um erro no servidor, tente mais tared')
                );
        }
    }

    protected setPageTitle() {
        if (this.currentAction == "new")
            this.pageTitle = this.creationPageTitle();
        else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    //valres deafult para títulos de pages
    protected creationPageTitle(): string {
        return "Novo";
    }

    protected editionPageTitle(): string {
        return "Edição";
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
        this.resourceService.create(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
        this.resourceService.update(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected actionsForSuccess(resource: T) {
        toastr.success("Solicitação processada com sucesso!");

        const baseComponentPath: string = 
            this.route.snapshot.parent.url[0].path;

        this.router.navigateByUrl(baseComponentPath,
            { skipLocationChange: true }).then(
                () => this.router
                    .navigate([baseComponentPath, resource.id, "edit"]
            )
        )
    }

    protected actionsForError(error: any) {
        toastr.error("Ocorreu um erro ao processar a sua solicitação!");
        this.submittingForm = false;

        if (error.status === 422)//algum erro de validação
            this.serverErrorMessages = JSON.parse(error._body).errors;
        else //erro de comunicação
            this.serverErrorMessages = 
                ["Falha na comunicação com o servidor,\
                     por favor tente mais tarde."];
    }

}