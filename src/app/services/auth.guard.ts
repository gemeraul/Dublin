import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// Servies
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Auth guard running');
      var isAuthenticated = this.authService.getAuthStatus();
      console.log(isAuthenticated);
      if (!isAuthenticated) {
          this.router.navigate(['/login']);
      }
      return isAuthenticated;
  }
  
}
