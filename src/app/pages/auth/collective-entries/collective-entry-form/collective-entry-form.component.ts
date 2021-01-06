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
    //selectedResidents: User[];

    constructor(
        protected injector: Injector,
        protected collectiveService: CollectiveEntriesService,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService,
        protected categoryService: CategoryService,
        protected propertyservice: PropertyService
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
            amount: [null],
            date: [null],
            categoryId: [null, [Validators.required]],
            user: [this.loadAuthResource()],
            selectedResidents: [null, [Validators.required]]
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
        super.ngOnInit();
    }

    private loadActiveProperty(){
        this.authUser = this.tokenService.currentUser;
        this.propertyservice
            .getCurrentActivePropertyId(this.authUser.id).subscribe(
                property => {
                    this.activeProperty = property;
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

    //sobrescrevendo os métodos para o título da página, para não utilizar o valor padrão
    protected creationPageTitle(): string{
        return "Cadastro de novo Lançamento";
    }

    protected editionPageTitle(): string{
        const resourceName = this.resource.name || ""; //caso ainda nao tenha sido carregado o dado, "" será exibido, evitnado o undefined
        return "Editando Lançamento: "+ resourceName;
    }

}
