import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/security/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {

  constructor( 
    private authService: AuthService,
    private router: Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (!this.authService.authenticated$.getValue()) { return true; }
    this.router.navigate(['/home']);
    return false;
  }
}


