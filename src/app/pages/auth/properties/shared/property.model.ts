import { BaseResourceModel } from "../../../../shared/models/base-resource.model"
import { User } from "../../../../security/models/user.model"

export class Property extends BaseResourceModel{

    constructor(
        public name?: string,
        public description?: string,
        public landLordLand?: string,
        public landLordPhone?: string,
        public zipCode?: string,
        public street?: string,
        public addressDetails?: string,
        public number?: string,
        public city?: string,
        public state?: string,
        public residents?: User[],
        public active?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Property{
        return Object.assign(new Property, jsonData);
    }

    static fromJsonToArray(jsonData: any): Property[]{
        let ent: Property[] = [];
        ent.push(Object.assign(new Property(),jsonData));
        return ent;
    }

    static paginationFromJson(jsonData: any): Property{
        return Object.assign(new Property(), jsonData.element);
    }

}