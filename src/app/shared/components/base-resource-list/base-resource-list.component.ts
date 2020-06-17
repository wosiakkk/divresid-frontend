import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit } from '@angular/core';
import { BaseResourceService } from '../../services/base-resource.service';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit{


    resources: T[] = [];

    constructor(private resourcesService: BaseResourceService<T>){

    }

    ngOnInit(): void {
        this.resourcesService.getAll().subscribe(
            resources => this.resources = resources,
            error => {
                return alert('Erro ao carregar Lista');
            }
        )

        console.log('aa: '+this.resources.values)
    }
    
}