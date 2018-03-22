import { Component } from '@angular/core';
import { Routes, RouterModule,ActivatedRoute,Router } from '@angular/router';
import { NavService } from '../../@core/data/nav.service';
import { TranslateService } from '../../@core/utils/translate.service';
import { HttpService } from '../../@core/utils/resource.service';
import { AuthService, NbAuthResult } from '../../modules/auth/services/auth.service';

@Component({
  selector: 'ngx-pages',
  template: `
   <app-layout>
    </app-layout>
  `,
})
export class SystemComponent {
  menu = [];
  intervalId
  constructor(public route: ActivatedRoute, protected service: AuthService,public router: Router,public httpService:HttpService,public navService:NavService,public translateService:TranslateService ) {
       console.log("system enter")
       this.intervalId = setInterval(()=>{
           this.httpService.get("/home/heartbeart",{}).map(res=>res.json()).subscribe(res=>{
               if(res.data.isLogin == false){
                    this.service.logout("email").subscribe((result: NbAuthResult) => {
                        const redirect = result.getRedirect();
                        if (redirect) {
                          setTimeout(() => {
                            return this.router.navigateByUrl(redirect);
                          }, 0);
                        }
                    });
               }
           })
       },60000)
  }


  ngOnDestroy(){
       console.log("system exit")
       if(this.intervalId){
           clearInterval(this.intervalId)
       }
  }
}
