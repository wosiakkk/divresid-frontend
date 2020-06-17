import { Injectable, Injector } from '@angular/core';
import { Category } from "./category.model"
import { BaseResourceService } from "../../../../shared/services/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{

  constructor(protected injector: Injector) { 
    super("http://192.168.0.4:8080/api/auth/categories", injector, Category.fromJson); 
  }

}
