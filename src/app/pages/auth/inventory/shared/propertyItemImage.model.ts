import { PropertyItem } from './propertyItem.model'

export class PropertyItemImage {
    constructor(
        public id?: number,
        public base64Image?: string,
        public propertyItem?: PropertyItem
    ){}
}