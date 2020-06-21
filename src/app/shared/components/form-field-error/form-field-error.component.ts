import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-error',
  template: `
      <p class="text-danger">
          {{errorMessage}}
      </p>
  `
})
export class FormFieldErrorComponent implements OnInit {

  //pegando data do form
  @Input('form-control') formControl: FormControl

  constructor() { }

  ngOnInit(): void {
  }


  public get errorMessage(): string | null{
    if(this.mustShowErrorMessage())
      return this.getErrorMessage();
    else
      return null;
  }

  private mustShowErrorMessage(): boolean{
    return this.formControl.invalid && this.formControl.touched;
  }

  private getErrorMessage(): string | null{
    if(this.formControl.errors.required)
      return "Dado obrigatório";

    else if(this.formControl.errors.email)
      return "Formato de e-mail inválido";

    else if(this.formControl.errors.minlength){
      const requiredLength = this.formControl.errors.minlength.requiredLength;
      return `Deve ter no mínimo ${requiredLength} caracteres`;
    }

    else if(this.formControl.errors.minlength){
      const requiredLength = this.formControl.errors.maxlength.requiredLength;
      return `Deve ter no máximo ${requiredLength} caracteres`;
    }
  }

}
