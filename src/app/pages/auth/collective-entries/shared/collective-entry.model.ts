import { User } from '../../../../security/models/user.model';
import { BaseResourceModel } from  '../../../../shared/models/base-resource.model'
import { Category } from '../../categories/shared/category.model'
import { Property } from '../../properties/shared/property.model'


export class CollectiveEntry extends BaseResourceModel {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: number,
        public date?: Date,
        public paid?: boolean,
        public collective?: boolean,
        public category?: Category,
        public property?: Property,
        public residents?: User[],
    ){
        super();
    }

    static fromJson(jsonData: any): CollectiveEntry{
        return Object.assign(new CollectiveEntry(),jsonData);
    }

    static paginationFromJson(jsonData: any): CollectiveEntry{
        return Object.assign(new CollectiveEntry(), jsonData.element);
    }
}