
import { Injectable } from '@angular/core';
import {Subject,Observable} from 'rxjs'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {NzNotificationService,NzMessageService} from 'ng-zorro-antd';
import {AuthService} from "../../modules/auth/services/auth.service"
import {parseAuthNodeByUrl} from  '../../modules/common/utils/route.utils'
import {UserService} from "../data/users.service"

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private userService:UserService,private messageService:NzMessageService,private authService:AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    // if (sessionStorage.getItem('use_id') !== null) {
    //   return true;
    // }
    let url: string = state.url;
    return Observable.create((observer)=>{
        this.authService.isAuthenticated().subscribe((res)=>{
          if(!res){
            this.messageService.error('请先登录');
            this.router.navigate(['/auth/login']);
            observer.next(false);
            observer.complete()
            return;
          }
          // let authNode = parseAuthNodeByUrl(url)
          // if(!this.userService.checkNodeIsAuth(authNode)){
          //   this.messageService.error('未认证'+authNode);
          //   res = false
          // }
          observer.next(res);
          observer.complete()
        })
    })
  }

}
