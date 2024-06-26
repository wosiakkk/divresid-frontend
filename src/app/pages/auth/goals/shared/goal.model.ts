import { BaseResourceModel } from '../../../../shared/models/base-resource.model'


export class Goal extends BaseResourceModel{

    constructor(
        public id?: number,
        public name?: string,
        public value?: number,
        public date?: Date,
        public percent?: any,
        public done?: boolean
    ){
        super();
    }

    static fromJson(jsonData: any): Goal{
        return Object.assign(new Goal(), jsonData);
    }

    static paginationFromJson(jsonData: any): Goal{
        return Object.assign(new Goal(), jsonData.element);
    }

}