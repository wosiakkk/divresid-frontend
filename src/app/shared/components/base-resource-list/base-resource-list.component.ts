import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { Pageable } from '../../interfaces/pageable.interface';
import { LazyLoadEvent } from 'primeng/api';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit{

    resources: T[] = [];
    totalRecords: number;
    loading: boolean = true;
    constructor(private resourcesService: BaseResourceService<T>){

    }

    loadLazyData(event: LazyLoadEvent) {
       
        const pageableData: Pageable = {
          page: (event.first / 5),
          size: event.rows,
          sort: event.globalFilter
        }

        this.resourcesService.getAllPagination(pageableData).subscribe(
            resources => {
                this.resources = resources;
                this.totalRecords = this.resourcesService.totalElements;this.totalRecords = this.resourcesService.totalElements;
                this.loading = false;
            },
            error => {
                return alert('Erro ao carregar Lista');
            }

        )
        this.loading = false;
    }

    ngOnInit(): void { 
        this.resourcesService.getNumberOfResources().subscribe(
            count => this.totalRecords = count
        )
    }
    
}