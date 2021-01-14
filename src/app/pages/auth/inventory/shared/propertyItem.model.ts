import { BaseResourceModel } from '../../../../shared/models/base-resource.model'
import { Resident } from '../../residents/shared/resident.model'
import { Property } from '../../properties/shared/property.model'
import { PropertyItemImage } from './propertyItemImage.model'

export class PropertyItem extends BaseResourceModel {

    constructor(
        public name?: string,
        public description?: string,
        public owner?: Resident,
        public property?: Property,
        public image?: PropertyItemImage
    ){
        super();
    }


    static fromJson(jsonData: any): PropertyItem{
        return Object.assign(new PropertyItem,jsonData);
    }

    static fromJsonToArray(jsonData: any): PropertyItem[]{ 
        let items:  PropertyItem[] = [];
        items.push(Object.assign(new PropertyItem, jsonData));
        return items;
    }

    static paginationFromJson(jsonData: any): PropertyItem{
        return Object.assign(new PropertyItem, jsonData.element);
    }
}