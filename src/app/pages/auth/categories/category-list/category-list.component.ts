import { Component, ChangeDetectorRef} from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastMessagesService } from "../../../../shared/services/toast-messages.service"

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  faSearch = faSearch;
  
  cols: any[] =  [
    { field: 'id', header: 'Categorias' },
    { field: 'desc', header: 'Ações' },
  ];

  constructor(private categoryService: CategoryService, 
      private change: ChangeDetectorRef , 
      private toastService: ToastMessagesService
    ) {
    super(categoryService,change,toastService)
  }

}
