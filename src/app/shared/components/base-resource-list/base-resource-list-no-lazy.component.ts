import { BaseResourceModel } from '../../models/base-resource.model'
import { ChangeDetectorRef, Directive, OnInit } from '@angular/core'
import { BaseResourceService } from '../../services/base-resource.service'
import { ToastMessagesService } from '../../services/toast-messages.service'
import { TokenStorageService } from '../../../security/services/token-storage.service'
import { User } from '../../../security/models/user.model'


@Directive()
export abstract class BaseResourceListNoLazy<T extends BaseResourceModel>
    implements OnInit {

    resources: T[] = [];        
    loading: boolean;
    emptyList: boolean  = false;
    
    constructor(
        private resourcesService: BaseResourceService<T>,
        private cdr: ChangeDetectorRef,
        private toastMessageService: ToastMessagesService,
        private tokenStorageService: TokenStorageService
    ){}

    ngOnInit(): void {
        this.loading = true;
        this.cdr.detectChanges();
        setTimeout(() => {
            let user: User = this.loadAuthResource();
            this.resourcesService.getAllByAuthUser(user).subscribe(
                resources => {
                    this.resources = resources;
                    this.loading = false;
                    if(this.resources.length <=0)
                        this.emptyList = true;
                    this.cdr.detectChanges();
                },
                error => {
                    this.toastMessageService.loadServerListErrorToast();
                }
            )
        }, 300);
    }

    protected loadAuthResource(){
        return new User(this.tokenStorageService.getUser().id);
    }

    eleteResource(resource : T){
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