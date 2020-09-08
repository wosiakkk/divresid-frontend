import { User } from '../../../../security/models/user.model';
import { Property } from '../../properties/shared/property.model';
import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Invite extends BaseResourceModel{
    constructor(
        public id?: number,
        public idFrom?: User,
        public idTo?: User,
        public idProperty?: Property,
        public accepted?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Invite{
        return Object.assign(new Invite(), jsonData);
    }

    static paginationFromJson(jsonData: any): Invite{
        return Object.assign(new Invite(), jsonData.element);
    }

}