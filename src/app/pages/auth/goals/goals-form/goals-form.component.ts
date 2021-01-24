import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Goal } from '../shared/goal.model';
import { GoalService } from '../shared/goal.service';

@Component({
  selector: 'app-goals-form',
  templateUrl: './goals-form.component.html',
  styleUrls: ['./goals-form.component.css']
})
export class GoalsFormComponent extends BaseResourceFormComponent<Goal> {
    
    
    protected buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            id: [null],
            name: [null,[Validators.required]],
            date: [null],
            value: [null],
            done: [false],
            user: [this.loadAuthResource()]
        });
    }

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
        protected goalService: GoalService,
        protected toastService: ToastMessagesService,
        protected tokenService: TokenStorageService
    ) { 
        super(injector, new Goal, goalService, Goal.fromJson
            ,toastService,tokenService);
    }

 
     //sobrescrevendo os métodos para o título da página, para não utilizar o valor padrão
     protected creationPageTitle(): string{
        return "Cadastro de uma nova Meta";
    }

    protected editionPageTitle(): string{
        const resourceName = this.resource.name || ""; //caso ainda nao tenha sido carregado o dado, "" será exibido, evitnado o undefined
        return "Editando Meta: "+ resourceName;
    }
}
