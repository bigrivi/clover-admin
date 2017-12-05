
import { Injectable } from '@angular/core';
import {Subject,Observable} from 'rxjs'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import {NbAuthService} from "../../auth/services/auth.service"
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private toasterService:ToasterService,private authService:NbAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    // if (sessionStorage.getItem('use_id') !== null) {
    //   return true;
    // }
    let url: string = state.url;
    return Observable.create((observer)=>{
        this.authService.isAuthenticated().subscribe((res)=>{
          if(!res){
            this.toasterService.pop('error', '请先登录');
            this.router.navigate(['/auth/login']);
          }
          observer.next(res);
          observer.complete()
        })
    })
  }

}