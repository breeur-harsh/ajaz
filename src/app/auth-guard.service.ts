import { CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router
} from '@angular/router'
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) { }
  canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(this.AuthService.loggedIn){
      return true;
    }
    else{
      this.router.navigate(['/']);
    }
  }
}