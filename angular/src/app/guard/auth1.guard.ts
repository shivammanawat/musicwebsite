import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../service/auth.service';
@Injectable()
export class Auth1Guard implements CanActivate {

  constructor(private authservice:AuthService, private router:Router){}


  canActivate()
  {
    if(!this.authservice.loggedin())
    {
      return true;
    }
    else{
      this.router.navigate(['/dashboard']);
      return false;
    }
    

  }
}
