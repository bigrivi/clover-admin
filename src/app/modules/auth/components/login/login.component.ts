import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { NbAuthResult, AuthService } from '../../services/auth.service';

@Component({
  selector: 'nb-login',
  styleUrls: ['./login.component.less'],
  template: `
    <nb-auth-block>
     <form nz-form [formGroup]="validateForm" class="login-form" (ngSubmit)="_submitForm()">
    <div nz-form-item>
      <div nz-form-control [nzValidateStatus]="validateForm.controls.username">
        <nz-input formControlName="username" [nzPlaceHolder]="'账号'" [nzSize]="'large'">
          <ng-template #prefix>
            <i class="anticon anticon-user"></i>
          </ng-template>
        </nz-input>
        <div nz-form-explain *ngIf="validateForm.controls.username.dirty&&validateForm.controls.username.hasError('required')">请输入账号</div>
      </div>
    </div>
    <div nz-form-item>
      <div nz-form-control [nzValidateStatus]="validateForm.controls.password">
        <nz-input formControlName="password" [nzType]="'password'" [nzPlaceHolder]="'密码'" [nzSize]="'large'">
          <ng-template #prefix>
            <i class="anticon anticon-lock"></i>
          </ng-template>
        </nz-input>
        <div nz-form-explain *ngIf="validateForm.controls.password.dirty&&validateForm.controls.password.hasError('required')">请输入密码</div>
      </div>
    </div>
    <div nz-form-item>
      <div nz-form-control>
        <label nz-checkbox formControlName="remember">
          <span>记住密码</span>
        </label>
        <button [disabled]="submitted || !validateForm.valid" nz-button class="login-form-button" [nzType]="'primary'" [nzSize]="'large'">登录</button>
      </div>
    </div>
  </form>
    </nb-auth-block>
  `,
})
export class LoginComponent {

 validateForm: FormGroup;
 redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    protected service: AuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router
  ) {
     this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
     this.showMessages = this.getConfigValue('forms.login.showMessages');
     this.provider = this.getConfigValue('forms.login.provider');
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }


  _submitForm() {
     this.errors = this.messages = [];
    this.submitted = true;
    this.service.authenticate(this.provider, this.validateForm.value).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      console.log(result)
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      console.log(redirect)
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });

  }

   getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
