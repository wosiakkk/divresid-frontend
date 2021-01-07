import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceListNoLazy } from 'src/app/shared/components/base-resource-list/base-resource-list-no-lazy.component';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Resident } from '../shared/resident.model'
import { ResidentService } from '../shared/resident.service'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { PropertyService } from '../../properties/shared/property.service';
import { User } from 'src/app/security/models/user.model';


@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.css']
})
export class ResidentListComponent 
    extends BaseResourceListNoLazy<Resident> {

    faSearch = faSearch;
    propertyId: number;
    userAuth;
    
    cols: any[] = [
        {field: 'name', header: 'Nome'},
        {field: 'email', header: 'E-mail'},
        {field: 'role', header: 'Permissão'},
        {field: 'actions', header: 'Ações'}
    ]

    constructor(
        private residentService: ResidentService,
        private propertySerive: PropertyService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenService: TokenStorageService
    ){
        super(residentService,change,toastService,tokenService);
     }

    //override
    ngOnInit(){
        this.loading = true;
        this.change.detectChanges();
        setTimeout(() => {
            let userAuth = this.loadAuthResource();
            this.userAuth = userAuth;
            this.propertySerive
                .getCurrentActivePropertyId(userAuth.id).subscribe(
                    p => {
                        this.resources = p.residents;
                        this.propertyId = p.id;
                        this.loading = false;
                        if(this.resources.length <=0)
                            this.emptyList = true;
                        this.change.detectChanges();
                    },
                    error => {
                        if(error.status === 404){
                            this.loading = false;
                            this.emptyList = true;
                            this.change.detectChanges();
                            this.toastService
                                .loadErrorToast(
                                    "Você não possui imóvel ativo"
                                    ,"toast-bottom-center")
                        }else{
                            this.toastService.loadServerListErrorToast();
                        }
                    }
                )
        }, 300); 
    }

    //override
    deleteResource(resource : Resident){
        const mustDelete = confirm('Deseja realmente excluir?');
        if(mustDelete){
          this.propertySerive.removeResident(resource.id,this.propertyId)
            .subscribe(
                () =>{ 
                    this.resources = 
                        this.resources.filter(
                            element => element != resource);
                    this.toastService.loadDeleteResourceSucess();
                },
                () => this.toastService.loadDeleteResourceError()
          )
        }
      }
}
