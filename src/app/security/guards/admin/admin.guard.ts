import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastMessagesService } from 'src/app/shared/services/toast-messages.service';
import { User } from '../../models/user.model';
import { TokenStorageService } from '../../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
        private tokenService: TokenStorageService,
        private toastService: ToastMessagesService
    ){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean 
        | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.checkRole();
    }

    checkRole(){
        let user: User = this.tokenService.currentUser;
        if(user.roles[0] == 'ROLE_ADMIN')
            return true;
        else{
            this.toastService
                .loadErrorToast("Você não tem" 
                    +"permissão para acessar esse recurso!",
                    "toast-bottom-center");
            return false;
        }

    }
    
}
