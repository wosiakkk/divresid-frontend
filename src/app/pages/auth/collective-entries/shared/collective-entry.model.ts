import { BaseResourceModel } from  '../../../../shared/models/base-resource.model'


export class CollectiveEntry extends BaseResourceModel {
    constructor(
        public id?:number
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