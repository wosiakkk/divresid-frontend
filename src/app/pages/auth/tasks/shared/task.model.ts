import { BaseResourceModel } from '../../../../shared/models/base-resource.model'
import { Resident } from '../../residents/shared/resident.model'
import { Property } from '../../properties/shared/property.model'


export class Task extends BaseResourceModel {

    constructor(
        public name?: string,
        public done?: boolean,
        public date?: Date,
        public targetUser?: Resident,
        public property?: Property
    ) {
        super();
    }


    static fromJson(jsonData: any): Task{
        return Object.assign(new Task(), jsonData);
    }

    static fromJsonToArray(jsonData: any): Task[]{
        let tasks: Task[] = [];
        tasks.push(Object.assign(new Task(), jsonData));
        return tasks;
    }

    static paginationFromJson(jsonData: any): Task{
        return Object.assign(new Task(), jsonData.element);
    }

}