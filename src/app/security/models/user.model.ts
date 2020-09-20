import { BaseResourceModel } from '../../shared/models/base-resource.model';

export class User extends BaseResourceModel{
    roles: any[];

    constructor(id : number, roles?: any[]){
        super();
        this.id = id
    }
}
   