import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { CollectiveEntry } from '../shared/collective-entry.model';
import { CollectiveEntriesService } from '../shared/collective-entries.service'
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { faSearch, faFilter, faEraser } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';
import { User } from 'src/app/security/models/user.model';

@Component({
  selector: 'app-collective-entry-list',
  templateUrl: './collective-entry-list.component.html',
  styleUrls: ['./collective-entry-list.component.css']
})
export class CollectiveEntryListComponent 
    extends BaseResourceListComponent<CollectiveEntry> {

    faSearch = faSearch;
    faFilter = faFilter;
    faEraser = faEraser;

    @ViewChild('month') month: ElementRef = null;
    @ViewChild('year') year: ElementRef = null;
    
    cols: any[] =  [
        { field: 'date', header: 'Data' },
        { field: 'desc', header: 'Descrição' },
        { field: 'amount', header: 'Valor' },
        { field: 'actions', header: 'Ações' }
      ];

    constructor(
        private collectiveService: CollectiveEntriesService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenStorage: TokenStorageService
    ){ 
        super(collectiveService,change,toastService,tokenStorage)
    }

    //override para poder usar filter
    loadLazyData(event: LazyLoadEvent){
        this.loading = true;
        this.change.detectChanges();

        const month = this.month.nativeElement.value;
        const year = this.year.nativeElement.value;

        const pageableData: Pageable = {
            page: (event.first / 5),
            size: event.rows,
            sort: event.globalFilter
        }

        setTimeout(() => {
            let user:User = this.loadAuthResource();
            if(month != "" && year != ""){
                this.collectiveService.
                    getAllPaginationByMonthAndYear(
                        pageableData,month,year,user
                    ).subscribe(
                        resources => {
                            this.resources = resources;
                            this.totalRecords =  this.collectiveService
                                                    .totalElements;
                            this.loading = false;
                            if(this.resources.length<=0)
                                this.emptyList=true;
                                this.change.detectChanges();
                        },
                        error => {
                            this.toastService.loadServerListErrorToast();
                        }                       
                    )
            } else{
                this.collectiveService
                    .getAllPagination(pageableData,user).subscribe(
                        resources => {
                            this.resources = resources;
                            this.totalRecords = this.collectiveService
                                                    .totalElements
                            this.loading = false;
                            if(this.resources.length<=0)
                                this.emptyList=true;
                                this.change.detectChanges();
                        },
                        error => {
                            this.toastService.loadServerListErrorToast();
                        }
                    )
            }
        }, 300);
    }

    clearFilter(){
        let event: LazyLoadEvent = { 
            first:0, rows:5, sortOrder:1, filters:{}, globalFilter :null
        };
        this.month.nativeElement.value = "";
        this.year.nativeElement.value = "";
        this. loadLazyData(event);
    }
}
