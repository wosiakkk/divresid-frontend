import { Component, OnInit, Injector } from '@angular/core';
import { Category } from '../../categories/shared/category.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry-service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Validators } from '@angular/forms';
import { User } from 'src/app/security/models/user.model';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry>
    implements OnInit {

        protected buildResourceForm(){
            this.resourceForm = this.formBuilder.group({
                id: [null],
                name: [null,[Validators.required]],
                description: [null],
                type: ["expense", [Validators.required]],
                amount: [null],
                date: [null],
                paid: [null],
                categoryId: [null, [Validators.required]],
                user: [this.loadAuthResource()]
            });
          }
        

    categories: Array<Category>;

   imaskConfig = {
        mask: Number,
        scale: 2,
        thousandsSeparator: '',
        padFractionalZeros: true,
        normalizeZeros: true,
        radix: ','
    };

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
        protected injector: Injector,
        protected entryService: EntryService,
        protected toastMessageService: ToastMessagesService,
        protected tokenStorageService: TokenStorageService,
        protected categoryService: CategoryService
    ) { 
        super(
            injector, new Entry,entryService,
            Entry.fromJson,toastMessageService,tokenStorageService
        );
    }

    ngOnInit(): void {
        this.loadCategories()
        super.ngOnInit()
     }

     get typeOptions(): Array<any>{
        return Object.entries(Entry.types).map(
          ([value, text]) => {
            return{
              text: text,
              value: value
            }
          }
        )
      }

    private loadCategories(){
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