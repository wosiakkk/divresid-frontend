import { Component} from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  styles: [`
        .old-car {
            background-color: #1CA979 !important;
            color: #ffffff !important;
        }

        .very-old-car {
            background-color: #2CA8B1 !important;
            color: #ffffff !important;
        }
    `
    ]
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  
  faSearch = faSearch;

  cols: any[] =  [
    { field: 'id', header: 'Categorias' },
    { field: 'desc', header: 'Ações' },
  ];

  constructor(private categoryService: CategoryService) {
    super(categoryService)
  }

}
