import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { PublicService } from "../../../pages/public/public.service";
import { TokenStorageService } from "../../services/token-storage.service"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor( 
      private authService: AuthService,
      private router: Router,
      private publicService: PublicService,
      private tokenStorageService: TokenStorageService
    ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    this.checkToken();
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
 
    if (this.authService.authenticated$.getValue()) { return true; }

    // Store the attempted URL for redirecting
    this.publicService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
  
  private checkToken(){
    if(this.tokenStorageService.isTokenExpired()){
      this.tokenStorageService.signOut();
      this.authService.unauthenticate();
      this.router.navigate(['/login']);
    }
  }

}
