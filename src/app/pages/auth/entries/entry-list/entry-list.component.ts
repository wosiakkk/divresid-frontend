import { Component, ChangeDetectorRef } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Entry } from "../shared/entry.model"
import { EntryService } from "../shared/entry-service"
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

    faSearch = faSearch;
    faFilter = faFilter;

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



}
