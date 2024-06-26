import { Injectable, Injector } from '@angular/core';
import { Category } from "./category.model"
import { BaseResourceService } from "../../../../shared/services/base-resource.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category>{

  constructor(protected injector: Injector) { 
    super("http://localhost:4200/api/auth/categories", injector, 
      Category.fromJson, Category.paginationFromJson); 
  }

}
