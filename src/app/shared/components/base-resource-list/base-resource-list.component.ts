import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit, ChangeDetectorRef, Directive } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { Pageable } from '../../interfaces/pageable.interface';
import { LazyLoadEvent } from 'primeng/api';
import { ToastMessagesService } from '../../services/toast-messages.service';
import { User } from 'src/app/security/models/user.model';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { count } from 'rxjs/operators';


@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> 
    implements OnInit{

    resources: T[] = [];
    totalRecords: number;
    loading: boolean;
    emptyList:boolean =false;
   
    constructor(
        private resourcesService: BaseResourceService<T>,
        private cdr: ChangeDetectorRef, 
        private toastMessageService: ToastMessagesService,
        private tokerStorageService: TokenStorageService
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
            let user:User = this.loadAuthResource();
            this.resourcesService.getAllPagination(pageableData,user).subscribe(
                resources => {
                    this.resources = resources;
                    this.totalRecords = this.resourcesService.totalElements;
                    this.loading = false;
                    if(this.resources.length<=0)
                        this.emptyList=true;
                    this.cdr.detectChanges();
                },
                error => {
                    this.toastMessageService.loadServerListErrorToast();
                }
            )
        }, 300 );   
    }

    ngOnInit(): void { 
        let user:User = this.loadAuthResource();
        this.resourcesService.getNumberOfResources(user).subscribe(
            count => this.totalRecords = count
        )
       
    }
    
    protected loadAuthResource(){
        return new User(this.tokerStorageService.getUser().id);

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