import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadEvent } from 'primeng/api';
import { User } from 'src/app/security/models/user.model';
import { AuthService } from 'src/app/security/services/auth.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Pageable } from 'src/app/shared/interfaces/pageable.interface';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Property } from '../../properties/shared/property.model';
import { PropertyService } from '../../properties/shared/property.service';
import { Task } from '../shared/task.model';
import { TaskService } from '../shared/task.service'


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent extends BaseResourceListComponent<Task> {

    constructor(
        public authService: AuthService,
        private change: ChangeDetectorRef,
        private toastService: ToastMessagesService,
        private tokenStorage: TokenStorageService,
        private taskService: TaskService,
        private propertyService: PropertyService
    ) {
        super(taskService,change,toastService,tokenStorage);
    }

    faSearch = faSearch;
    activeProperty: Property = new Property();
    authUser: User;

    cols: any[] =  [
        { field: 'name', header: 'Atividades',width:'45%' },
        { field: 'targetUser', header: 'Responsável',width:'15%' },
        { field: 'date', header: 'Data', width:'10%' },
        { field: 'status', header: 'Status',width:'15%' },
        { field: 'actions', header: 'Ações',width:'15%' },
    ];

    //override
    async ngOnInit(){
        this.loading = true;
        let user:User = this.loadAuthResource();
        this.authUser = user;
        this.activeProperty =  await this.loadActiveProperty(user);
    }

    //override
    loadLazyData(event: LazyLoadEvent) {
        this.loading = true;
        this.change.detectChanges();
        const pageableData: Pageable = {
            page: (event.first / 5),
            size: event.rows,
            sort: event.globalFilter
        }

        setTimeout(() => {
            this.change.detectChanges();
            this.taskService
                .getAllPagination(pageableData,this.activeProperty).subscribe(
                    resources => {
                        this.resources = resources;
                        console.log("resources: "+ JSON.stringify(resources))
                        console.log("resources size: "+ resources.length)
                        this.totalRecords = this.taskService.totalElements;
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

    setDone(id: any){
        console.log('Finalizando atividade de id: '+ id)
        
    }

    loadActiveProperty(user: User): Promise<Property>{
        return this.propertyService
            .getCurrentActivePropertyId(user.id).toPromise();
    }
}
