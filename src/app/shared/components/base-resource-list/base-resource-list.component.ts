import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit,ChangeDetectorRef } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { Pageable } from '../../interfaces/pageable.interface';
import { LazyLoadEvent } from 'primeng/api';
import { ToastMessagesService } from '../../services/toast-messages.service';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> 
    implements OnInit{

    resources: T[] = [];
    totalRecords: number;
    loading: boolean;
    constructor(
        private resourcesService: BaseResourceService<T>,
        private cdr: ChangeDetectorRef, 
        private toastMessageService: ToastMessagesService
    ){ }

    loadLazyData(event: LazyLoadEvent) {
       
        this.loading = true;
        this.cdr.detectChanges();
        const pageableData: Pageable = {
            page: (event.first / 5),
            size: event.rows,
            sort: event.globalFilter
        }

        setTimeout(() => {
            this.resourcesService.getAllPagination(pageableData).subscribe(
                resources => {
                    this.resources = resources;
                    this.totalRecords = this.resourcesService.totalElements;
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error => {
                    this.toastMessageService.loadServerListErrorToast();
                }
            )
        }, 300 );   
    }

    ngOnInit(): void { 
       
        this.resourcesService.getNumberOfResources().subscribe(
            count => this.totalRecords = count
        )
       
    }
    
    deleteResource(resource : T){
        const mustDelete = confirm('Deseja realmente excluir?');
        if(mustDelete){
          this.resourcesService.delete(resource.id).subscribe(
            () =>{ 
                this.resources = 
                    this.resources.filter(element => element != resource);
                this.toastMessageService.loadDeleteResourceSucess();
            },
            () => this.toastMessageService.loadDeleteResourceError()
          )
        }
      }
   

}