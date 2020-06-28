import { BaseResourceModel } from '../../shared/models/base-resource.model';

export class User extends BaseResourceModel{
    constructor(id : number){
        super();
        this.id = id
    
    }
}
   