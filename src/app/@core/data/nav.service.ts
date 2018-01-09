import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class NavService {

  protected navs: any = [
  ];


  protected activeIndexState$ = new BehaviorSubject(0);


  setNavData(navData: any) {
    this.navs = navData;
  }

  getNavData() {
    return this.navs
  }


  setCurrNav(index: number) {
     this.activeIndexState$.next(index);
  }


   onNavChangeState(): Observable<any> {
    return this.activeIndexState$.asObservable();
  }


 
}
