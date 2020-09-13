import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
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
export class ResidentListComponent implements OnInit {
//component sem lazyloading, não implementnado o base list resource

    faSearch = faSearch;
    residents: Resident[] = [];
    loading: boolean;
    
    cols: any[] = [
        {field: 'name', header: 'Nome'},
        {field: 'email', header: 'E-mail'},
        {field: 'actions', header: 'Ações'}
    ]

    constructor(
        private residentService: ResidentService,
        private propertySerive: PropertyService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenService: TokenStorageService
    ){ }

    ngOnInit(){
        this.change.detectChanges();
        this.loading = true;
        let userAuth = this.loadAuthResource();
        this.propertySerive.getCurrentActivePropertyId(userAuth.id).subscribe(
            p => {
                this.residents = p.residents;
                this.loading = false; 
                this.change.detectChanges();
            },
            error => alert('problema ao carregar moradores')
        )
    }

    private loadAuthResource(){
        return new User(this.tokenService.getUser().id);

    }

    deleteResource(resource : Resident){
        const mustDelete = confirm('Deseja realmente excluir?');
        if(mustDelete){
        /*  this.resourcesService.delete(resource.id).subscribe(
            () =>{ 
                this.resources = 
                    this.resources.filter(element => element != resource);
                this.toastMessageService.loadDeleteResourceSucess();
            },
            () => this.toastMessageService.loadDeleteResourceError()
          )*/
        }
      }
}
