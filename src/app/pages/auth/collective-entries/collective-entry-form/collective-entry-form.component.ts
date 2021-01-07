import { Component, OnInit, Injector } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { CollectiveEntry } from '../shared/collective-entry.model';
import { CollectiveEntriesService } from '../shared/collective-entries.service'
import { Validators } from '@angular/forms';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';
import { User } from 'src/app/security/models/user.model';
import { PropertyService } from '../../properties/shared/property.service';
import { Property } from '../../properties/shared/property.model';
import { AuthService } from 'src/app/security/services/auth.service';
import { switchMap } from 'rxjs/operators';


@Component({
    selector: 'app-collective-entry-form',
    templateUrl: './collective-entry-form.component.html',
    styleUrls: ['./collective-entry-form.component.css']
})
export class CollectiveEntryFormComponent
    extends BaseResourceFormComponent<CollectiveEntry>
    implements OnInit {

    types: Array<any>;
    categories: Array<Category>;
    activeProperty: Property = new Property();
    authUser: User;
    residents: User[];
    collectiveEntry: CollectiveEntry;
    //selectedResidents: User[];

    constructor(
        protected injector: Injector,
        protected collectiveService: CollectiveEntriesService,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService,
        protected categoryService: CategoryService,
        protected propertyservice: PropertyService,
        protected authService: AuthService
    ) {
        super(
            injector, new CollectiveEntry(),
            collectiveService, CollectiveEntry.fromJson,
            toastService, tokenService
        );
    }

    imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            description: [null],
            type: ["expense"],
            amount: [null],
            date: [null],
            categoryId: [null, [Validators.required]],
            user: [this.loadAuthResource()],
            selectedResidents: [null, [Validators.required]],
            property: [null]
        })
    }

    //config calendar primeng
    ptBR = {
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar',
    }


    ngOnInit(): void {
        this.loadCategories();
        this.loadActiveProperty();
        this.loadResource();
        super.ngOnInit()
    }

    private loadActiveProperty(){
        this.authUser = this.tokenService.currentUser;
        this.propertyservice
            .getCurrentActivePropertyId(this.authUser.id).subscribe(
                property => {
                  //  property.residents.push(this.authUserToResident());
                    this.resourceForm.controls['property'].setValue(property);
                    this.residents = property.residents;
                },
                error => this.toastService
                    .loadErrorToast("Problema ao carregar imóvel ativo"
                     + error, "toast-bottom-center")
            )
    }

    private loadCategories() {
        const user: User = this.loadAuthResource();
        this.categoryService
            .getAllByAuthUser(user).subscribe(
                c => this.categories = c
            )
    }

    private setCurrentSelectedResidents(resource: any){
        let residentsListWithCollEntry: User[] = new Array();
        resource.generatedEntries.forEach(
            entry =>{
                residentsListWithCollEntry.push(entry.user);
            }
        )
        this.resourceForm.controls['selectedResidents']
            .setValue(residentsListWithCollEntry);
        
    }

    private authUserToResident(): User{
        let user: User = new User(this.authUser.id);
        user.name = this.authUser.name;
        return user;
    }

      //overirde para carregar moradores selecionados
      protected loadResource() {
        if (this.currentAction == "edit") {
            console.log('entrando no metodo')
            this.route.paramMap.pipe(
                switchMap(params =>
                    this.collectiveService.getById(+params.get("id")))
            )
                .subscribe(
                    resource => {
                        this.collectiveEntry = resource;
                        this.resourceForm.patchValue(resource);
                        this.setCurrentSelectedResidents(resource);
                    },
                    error => 
                        this.toastMessagesService.loadServerErrorToast()
                );
        }
    }


    //sobrescrevendo os métodos para o título da página, para não utilizar o valor padrão
    protected creationPageTitle(): string{
        return "Cadastro de novo Lançamento Coletivo";
    }

    protected editionPageTitle(): string{
        const resourceName = this.resource.name || ""; //caso ainda nao tenha sido carregado o dado, "" será exibido, evitnado o undefined
        return "Editando Lançamento Coletivo: "+ resourceName;
    }

}
