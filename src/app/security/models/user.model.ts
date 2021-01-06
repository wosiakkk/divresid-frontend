import { BaseResourceModel } from '../../shared/models/base-resource.model';

export class User extends BaseResourceModel{
    roles: any[];
    name: string;

    constructor(id : number, roles?: any[], name?: string){
        super();
        this.id = id
    }
}
   