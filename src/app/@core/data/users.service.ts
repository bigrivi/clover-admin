import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class UserService {
  private userArray: any[];
  private authorizeNodes:any[];
  protected userInfo$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    // this.userArray = Object.values(this.users);
    this.getUserInfo().subscribe(userInfo => this.publishUserInfo(userInfo));

  }

  setUserInfo(userInfo):Observable<any>{
   localStorage.setItem("userInfo",JSON.stringify(userInfo))
   return Observable.of(null).switchMap(_=>this.getUserInfo())
   .do((userInfo$)=>{
     this.publishUserInfo(userInfo$)
   })
  }

  setAuthNodes(authorizeNodes){
   localStorage.setItem("authorizeNodes",JSON.stringify(authorizeNodes))
   this.authorizeNodes = authorizeNodes;
  }

  checkNodeIsAuth(node:string){
    if(!this.authorizeNodes){
      this.authorizeNodes = JSON.parse(localStorage.getItem("authorizeNodes"))
    }
    return this.authorizeNodes.indexOf(node)>=0;
  }

  getUserInfo(){
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))
    return Observable.of(userInfo)
  }


  publishUserInfo(userInfo){
    this.userInfo$.next(userInfo)
  }

  userInfoChange():Observable<any>{
    return this.userInfo$.publish().refCount();
  }


}
