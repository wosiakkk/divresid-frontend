import { BaseResourceModel } from "../../../../shared/models/base-resource.model";

export class Resident extends BaseResourceModel{
    constructor(
        id?: number,
        name?: string,
        email?: string,
        roles?: string[]
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