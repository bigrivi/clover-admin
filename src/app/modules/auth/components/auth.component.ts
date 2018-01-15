import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '../services/auth.service';

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
      <router-outlet></router-outlet>
  `,
})
export class NbAuthComponent implements OnDestroy {

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService) {

    this.subscription = auth.onAuthenticationChange()
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
