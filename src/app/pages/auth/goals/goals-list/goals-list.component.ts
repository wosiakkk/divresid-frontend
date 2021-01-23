import { ChangeDetectorRef, Component} from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Goal } from '../shared/goal.model'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { GoalService } from '../shared/goal.service'

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent extends BaseResourceListComponent<Goal> {

    faSearch = faSearch;

    cols: any[] =  [
        { field: 'id', header: 'Metas' },
        { field: 'desc', header: 'Ações' },
      ];

    constructor(
        private goalsService: GoalService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenService: TokenStorageService
    ) {
        super(goalsService,change,toastService,tokenService);
     }

}
