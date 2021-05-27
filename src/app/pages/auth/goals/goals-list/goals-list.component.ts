import { ChangeDetectorRef, Component} from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Goal } from '../shared/goal.model'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { GoalService } from '../shared/goal.service'
import { EntryService } from '../../entries/shared/entry-service';
import { User } from 'src/app/security/models/user.model';
import { Entry } from '../../entries/shared/entry.model';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent extends BaseResourceListComponent<Goal> {

    faSearch = faSearch;
    daysToGo: number;
    authUser: User;
    currentMonth: number;
    currentYear: number;
    expenseTotal: any = 0;
    revenueTotal: any = 0;
    balance: any = 0;
    currentEntries: Entry[]= [];
    showEntries: boolean = false;
    goalPercentValue: any;

    cols: any[] =  [
        { field: 'name', header: 'Metas' },
        { field: 'value', header: 'Valor' },
        { field: 'date', header: 'Data Limite' },
        { field: 'date', header: 'Status' },
        { field: 'desc', header: 'Ações' },
      ];

    constructor(
        private goalsService: GoalService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenService: TokenStorageService,
        private entryService: EntryService,
    ) {
        super(goalsService,change,toastService,tokenService);
     }

    ngOnInit(){
        let user:User = this.loadAuthResource();
        this.goalsService.getNumberOfResources(user).subscribe(
            count => this.totalRecords = count
        )
        this.currentMonth = new Date().getMonth() +1;
        this.currentYear = new Date().getFullYear();
        this.entryService.getAllByAuthUser(user)
            .subscribe(this.setValues.bind(this))
    }

    protected loadAuthResource(){
        return new User(this.tokenService.getUser().id);

    }

    loadLazyData(event: LazyLoadEvent) {
        this.loading = true;
        this.change.detectChanges();
        const pageableData: Pageable = {
            page: (event.first / 5),
            size: event.rows,
            sort: event.globalFilter
        }

        setTimeout(() => {
            let user:User = this.loadAuthResource();
            this.goalsService.getAllPagination(pageableData,user).subscribe(
                resources => {
                    this.resources = resources;
                    this.resources.forEach(g => {
                        g.percent = ((this.balance * 100) / g.value);
                        //g.percent = g.percent + '%'
                    })
                    this.totalRecords = this.goalsService.totalElements;
                    this.loading = false;
                    if(this.resources.length<=0)
                        this.emptyList=true;
                    this.change.detectChanges();
                },
                error => {
                    this.toastService.loadServerListErrorToast();
                }
            )
        }, 300 );   
    }

    setValues(currentEntries: Entry[]){
        Object.keys(currentEntries).forEach(e=>{
            if(currentEntries[e] != undefined)
               this.currentEntries.push(currentEntries[e]);
            }
        );
        if(this.currentEntries.length > 0){
            this.showEntries = true;
            let expenseTotal = 0;
            let revenueTotal = 0;

            this.currentEntries.forEach(entry => {
                if(entry.type == 'revenue')
                    revenueTotal += entry.amount;
                else
                    expenseTotal += entry.amount; 
            })

            this.balance = (revenueTotal-expenseTotal);
        }
    }

}
