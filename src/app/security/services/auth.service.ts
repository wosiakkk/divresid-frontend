import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authName$: BehaviorSubject<string> = new BehaviorSubject(null);
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

  public setName(value: string) {
    this.authName$.next(value);
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
