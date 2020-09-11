import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router'
import { AuthService } from './auth.service'
export class AuthGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) { }
  canActivate(activeRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}
