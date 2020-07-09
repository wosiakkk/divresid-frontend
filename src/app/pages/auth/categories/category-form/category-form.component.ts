import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';
import { Validators } from '@angular/forms';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {

  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector,
    protected toastMessagesService: ToastMessagesService,
    protected tokerStorageService: TokenStorageService
  ){
    super(injector, new Category(), 
      categoryService, Category.fromJson,toastMessagesService,tokerStorageService)
   }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
      user: [this.loadAuthResource()]
    })
  }

  //sobrescreita dos valores default de titulos de página
  protected creationPageTitle(): string{
    return "Cadastro de nova Categoria";
  }

  protected editionPageTitle() :string{
    return "Edição da Categoria";
  }

}
