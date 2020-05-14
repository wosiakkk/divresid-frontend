import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { PublicService } from "../../../pages/public/public.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor( 
      private authService: AuthService,
      private router: Router,
      private publicService: PublicService
    ){}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
 
    if (this.authService.authenticated$.getValue()) { return true; }

    // Store the attempted URL for redirecting
    this.publicService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
  
}
