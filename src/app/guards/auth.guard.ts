import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../products/services/user.service';

@Injectable({
  providedIn:"root"
})

export class authGuard implements CanActivate {
  
  //constructor(private service: ProductService, private router:Router){}
  constructor(private Userservice: UserService, private router:Router){}

  canActivate(): boolean{
    if(this.Userservice.isLoggenIn()){
      return true;
    }else{
      this.router.navigate(["/login"]);
      return false;
    }
  }
};
