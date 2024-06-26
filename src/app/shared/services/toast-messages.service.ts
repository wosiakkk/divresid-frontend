import { Injectable } from '@angular/core';
import toastr from "toastr";


@Injectable({
  providedIn: 'root'
})
export class ToastMessagesService {

    constructor() { }

    loadWelcomeMessageToast(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.success("Bem vindo ao sistema!", "Login realizado");
    }

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

    loadDeleteResourceError(){
        toastr.options.positionClass = 'toast-top-center';
        toastr.options.onclick = null;
        toastr.options.tapToDismiss = false;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error("Problema ao realizar a exclusão,"+
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

    loadCepApiErrorToast(){
        toastr.options.positionClass = 'toast-top-center';
        toastr.options.onclick = null;
        toastr.options.tapToDismiss = false;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error("Problema ao carregar CEP, insira manualmente");
    }

    loadCreatedResourceSuccess(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.success("Dado salvo com sucesso!", "Sucesso");
    }






    /*refatorar esses métodos, deixaer generico como este*/
    loadCreatedResourceSuccessMsg(msg: string, position: string){
        toastr.options.positionClass = position;
        toastr.success(msg);
    }
    loadErrorToast(msg: string, position: string){
        toastr.options.positionClass = position;
        toastr.options.onclick = null;
        toastr.options.tapToDismiss = false;
        toastr.options.timeOut = 0;
        toastr.options.extendedTimeOut = 0;
        toastr.options.closeButton = true;
        toastr.error(msg);
    }











    loadUpdateResourceSuccess(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.success("Dado atualizado com sucesso!", "Sucesso");
    }

    loadDeleteResourceSucess(){
        toastr.options.positionClass = 'toast-bottom-center';
        toastr.success("Dado excluído com sucesso!", "Sucesso");
    }

}