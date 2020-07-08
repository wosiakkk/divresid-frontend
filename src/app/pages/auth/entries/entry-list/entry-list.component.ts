import { Component, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Entry } from "../shared/entry.model"
import { EntryService } from "../shared/entry-service"
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadEvent } from 'primeng/api';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';
import { User } from 'src/app/security/models/user.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

    faSearch = faSearch;
    faFilter = faFilter;

    @ViewChild('month') month: ElementRef = null;
    @ViewChild('year') year: ElementRef = null;

    cols: any[] =  [
        { field: 'date', header: 'Data', width:'10%' },
        { field: 'entry', header: 'Lançamento', width:'45%' },
        { field: 'amount', header: 'Valor', width:'15%' },
        { field: 'status', header: 'Situação', width:'15%' },
        { field: 'actions', header: 'Ações', width:'15%' }
    ];

    constructor(
        private change: ChangeDetectorRef , 
        private toastService: ToastMessagesService,
        private tokenSotrage: TokenStorageService,
        private entryService: EntryService 
    ) {
        super(entryService,change,toastService,tokenSotrage);
    }

    //override
    loadLazyData(event: LazyLoadEvent) {
        console.log("event: "+ JSON.stringify(event));
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
                this.entryService.getAllPaginationByMonthAndYear(pageableData,month,year,user).subscribe(
                    resources => {
                        this.resources = resources;
                        this.totalRecords = this.entryService.totalElements;
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
            this.entryService.getAllPagination(pageableData,user).subscribe(
                resources => {
                    this.resources = resources;
                    this.totalRecords = this.entryService.totalElements;
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



}
