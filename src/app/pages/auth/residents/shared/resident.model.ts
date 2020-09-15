import { BaseResourceModel } from "../../../../shared/models/base-resource.model";
import { Role } from '../../../../security/models/role.model'

export class Resident extends BaseResourceModel{
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

    static paginationFromJson(jsonData: any): Resident{
        return Object.assign(new Resident(), jsonData.element);
    }
}