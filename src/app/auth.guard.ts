import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'
import {Injectable} from '@angular/core'
import { AuthService } from './servises/auth.service'


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    let isAuth:boolean = this.authService.isAuthenticated()
    if (isAuth) {
      return true
    } else {
      this.router.navigate(['/'], {
        queryParams: {
          auth: false
        }
      })
      return false
    }
  }
}
