import { User } from '../../../../security/models/user.model';
import { BaseResourceModel } from  '../../../../shared/models/base-resource.model'
import { Category } from '../../categories/shared/category.model'
import { Entry } from '../../entries/shared/entry.model';
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
        public categoryId?: number,
        public property?: Property,
        public residents?: User[],
        public selectedResidents?: User[],
        public generatedEntries?: Entry[]
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