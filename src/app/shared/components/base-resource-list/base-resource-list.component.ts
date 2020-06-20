import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit,ChangeDetectorRef } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';
import { Pageable } from '../../interfaces/pageable.interface';
import { LazyLoadEvent } from 'primeng/api';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit{

    resources: T[] = [];
    totalRecords: number;
    loading: boolean;
    constructor(private resourcesService: BaseResourceService<T>,private cdr: ChangeDetectorRef){
        
    }

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
                    this.totalRecords = this.resourcesService.totalElements;this.totalRecords = this.resourcesService.totalElements;
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error => {
                    return alert('Erro ao carregar Lista');
                }
            )
        }, 300 );   
    }

    ngOnInit(): void { 
       
        this.resourcesService.getNumberOfResources().subscribe(
            count => this.totalRecords = count
        )
       
    }
    
}