import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authUserName$: BehaviorSubject<string> = new BehaviorSubject(null);
  authAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authMod$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authUser$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public authenticate() {
    this.authenticated$.next(true);
  }

  public unauthenticate() {
    this.authenticated$.next(false);
  }

  public setUsername(value:string){
    this.authUserName$.next(value);
  }

  public setRoles(values:string[]){
    values.forEach(role =>{
      if(role == "ROLE_ADMIN")
        this.authAdmin$.next(true);
      else if((role == "ROLE_MODERATOR"))
        this.authMod$.next(true);
      else
        this.authUser$.next(true);
    });
  }
 
}
