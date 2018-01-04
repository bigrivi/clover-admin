import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Request,URLSearchParams, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
import 'rxjs/Rx';
import { NbAuthResult } from '../modules/auth/services/auth.service';
import { NbAbstractAuthProvider } from '../modules/auth/providers/abstract-auth.provider';
import { NbAuthSimpleToken, NbTokenService } from '../modules/auth/services/token.service';
import {UserService} from "./data/users.service"

import {API_ROOT} from "../config"

export interface CloverAuthProviderConfig {
  delay?: number;
  alwaysFail?: boolean;
}

@Injectable()
export class CloverAuthProvider extends NbAbstractAuthProvider {
  
  constructor(public http:Http,public userSerive:UserService) {
    super()
  }

  protected defaultConfig: CloverAuthProviderConfig = {
    delay: 0,
  };

  authenticate(data?: any): Observable<NbAuthResult> {
    console.log(data)

    return Observable.create((observer)=>{
       this.http.get(API_ROOT+"account/users/authenticate?"+this.formEncode(data)).subscribe((response)=>{
          response = response.json();
          if(response["err"]){
            observer.next(new NbAuthResult(false,
            this.createFailResponse(data),
            null,
            [response["err"]]));
          }
          else{
            this.userSerive.setUserInfo(response["userInfo"]).subscribe(()=>{})
             let token = new NbAuthSimpleToken()
             token.setValue(response["token"])
             let authResult = new NbAuthResult(true, this.createSuccessResponse(response), this.getConfigValue("redirect"), ['Successfully logged in.'],null,token)
             observer.next(authResult)
          }
      })
    })
    //return Observable.of(this.createDummyResult(data))
      //.delay(this.getConfigValue('delay'));
  }

  register(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  logout(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createLogoutResult(data))
      .delay(this.getConfigValue('delay'));
  }


   /**
     * 表单数据处理
     *
     * @param {any} obj
     * @returns
     * @memberof KnxHttp
     */
    formEncode(obj) {
        var encodedString = '';
        for (var key in obj) {
            if (encodedString.length !== 0) {
                  encodedString += '&';
            }

            encodedString += key + '=' + encodeURI(obj[key]);
        }
        return encodedString
       // return encodedString.replace(/%20/g, '+');
    }


  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getConfigValue('alwaysFail')) {
      return new NbAuthResult(false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.']);
    }
    return new NbAuthResult(true, this.createSuccessResponse(data), this.getConfigValue("redirect"), ['Successfully logged in.']);
  }

   protected createLogoutResult(data?: any): NbAuthResult {
    if (this.getConfigValue('alwaysFail')) {
      return new NbAuthResult(false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.']);
    }

    return new NbAuthResult(true, this.createSuccessResponse(data), '/auth/login', ['Successfully logged in.']);
  }
}
