import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { CollectiveEntry } from '../shared/collective-entry.model';
import { CollectiveEntriesService } from '../shared/collective-entries.service'
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-collective-entry-list',
  templateUrl: './collective-entry-list.component.html',
  styleUrls: ['./collective-entry-list.component.css']
})
export class CollectiveEntryListComponent 
    extends BaseResourceListComponent<CollectiveEntry> {

    faSearch = faSearch;
    
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

}
