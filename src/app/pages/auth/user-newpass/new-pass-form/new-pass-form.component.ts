import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/security/services/token-storage.service';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { Resident } from '../../residents/shared/resident.model';
import { NewPassService } from '../shared/new-pass.service';
import { NewPassReq } from '../shared/newpass-req.model';
import toastr from "toastr";



@Component({
  selector: 'app-new-pass-form',
  templateUrl: './new-pass-form.component.html',
  styleUrls: ['./new-pass-form.component.css']
})
export class NewPassFormComponent implements OnInit {

    userAuth: Resident;
    resourceForm: FormGroup;
    submittingForm: boolean = false;
    pageTitle: string;
    serverErrorMessages: string[] = null;

    buildResourceForm(): void {
        this.resourceForm = this.formBuilder.group({
            userId: [this.userAuth.id],
            currentPass: [null, 
                [Validators.required]],
            newPass: [null, 
                [Validators.required]],
            confirmPassword: [null ,
                [Validators.required]]
        }, { validators: this.checkPasswords })
      }

    constructor(
        private tokenService: TokenStorageService,
        private toastService: ToastMessagesService,
        private newPassService: NewPassService,
        private formBuilder: FormBuilder
    ) { }

    ngAfterContentChecked(): void {
        this.setPageTitle();
    }

    ngOnInit(): void {
        this.userAuth = this.tokenService.currentUser
        this.buildResourceForm();
    }

    submitForm() {
        this.submittingForm = true;
        this.createNewPass();
    }

    protected createNewPass() {
        let resource: NewPassReq = Object
            .assign(new NewPassReq(), this.resourceForm.value);
        this.newPassService.newpass(resource)
            .subscribe(
                resource => this.actionsForSuccess(resource),
                error => this.actionsForError(error)
            )
    }

    protected setPageTitle() {
        this.pageTitle = "Alterar senha";
    }

    protected actionsForSuccess(resource: NewPassReq) {
        this.toastService.loadUpdateResourceSuccess();
    }

    protected actionsForError(error: any) {
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.error("Ocorreu um erro ao processar a sua solicitação!");
        this.submittingForm = false;

        if (error.status === 422){//algum erro de validação
            this.serverErrorMessages = JSON.parse(error._body).errors;
            this.toastService.
                loadValidationsErrorsToast(this.serverErrorMessages);
        }
        else //erro de comunicação
            this.toastService.loadServerErrorToast();
    }

    checkPasswords(group: FormGroup) {
        const password = group.get('newPass').value;
        const confirmPassword = group.get('confirmPassword').value;
        return password === confirmPassword ? null : { notSame: true }     
    }
}
