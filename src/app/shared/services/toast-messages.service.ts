import { Injectable } from '@angular/core';
import toastr from "toastr";


@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

    constructor() { }

    loadServerListErrorToast(){
        toastr.options.positionClass = 'toast-top-center';
        toastr.options.onclick = null;
        toastr.options.tapToDismiss = false;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error("Problema ao carregar a lista,"+
            "tente mais tarde <br /><br /><a href=\"home\" "+
            "type=\"button\" class=\"btn clear\">Sair</a>", "Erro no servidor");
    }

    loadServerErrorToast(){
        toastr.options.positionClass = 'toast-top-center';
        toastr.options.onclick = null;
        toastr.options.tapToDismiss = false;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error("Problema ao realizar sua ação,"+
            "tente mais tarde <br /><br /><a href=\"home\" "+
            "type=\"button\" class=\"btn clear\">Sair</a>", "Erro no servidor");
    }

    loadValidationsErrorsToast(errors: string[]){
        toastr.options.positionClass = 'toast-top-center';
        toastr.options.onclick = null;
        toastr.options.tapToDismiss = false;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error(errors.toString, "Problema no dados informados");
    }

    loadCreatedResourceSuccess(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.success("Dado salvo com sucesso!", "Sucesso");
    }

    loadUpdateResourceSuccess(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.success("Dado atualizado com sucesso!", "Sucesso");
    }

}