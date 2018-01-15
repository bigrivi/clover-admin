import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, NbAuthResult } from '../../services/auth.service';

@Component({
  selector: 'nb-logout',
  template: `
    <div align="center">登出中, 请稍后...</div>
  `,
})
export class LogoutComponent implements OnInit {

  redirectDelay: number = 1500;

  constructor(protected service: AuthService,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.logout('email');
  }

  logout(provider: string): void {
    this.service.logout(provider).subscribe((result: NbAuthResult) => {

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }
}
