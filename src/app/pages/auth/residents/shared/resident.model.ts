import { BaseResourceModel } from "../../../../shared/models/base-resource.model";
import { Role } from '../../../../security/models/role.model'
import { ResidentFormComponent } from '../resident-form/resident-form.component';

export class Resident extends BaseResourceModel{
    roles: Role[];
    constructor(
        id?: number,
        name?: string,
        email?: string,
        roles?: Role[]
    ){
        super();
    }

    static fromJson(jsonData: any): Resident{
        return Object.assign(new Resident(), jsonData);
    }

    static fromJsonToRoleUpdate(jsonData: any): Resident{
        console.log('jasondaa: '+JSON.stringify(jsonData))
        let roles: Role[] = [];
        let r = new Role()
        r.name = jsonData.roles
        r.id = null
        roles.push(r);
        console.log('roles: '+JSON.stringify(roles))
        let resident = new Resident();
        resident.id = jsonData.id;
        resident.roles = roles;
        
        console.log('resident preenchi man: '+JSON.stringify(resident))
        return resident;
    }

    static paginationFromJson(jsonData: any): Resident{
        return Object.assign(new Resident(), jsonData.element);
    }
}