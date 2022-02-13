import { Component, OnInit, NgZone } from '@angular/core';

// Auth0
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { mergeMap } from 'rxjs/operators';
import { App } from '@capacitor/app';
import { callbackUri } from '../auth.config';
import { tap } from 'rxjs/operators';

// Build the URL to return back to your app after logout
//const returnTo = `com.auth.heyapp://dev-o06c7mkq.us.auth0.com/capacitor/com.auth.heyapp/callback`;
const returnTo = callbackUri;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  profileJson: string = null;
  title = 'auth0';

  constructor(
    public auth: AuthService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    /* this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    ); */

     // Use Capacitor's App plugin to subscribe to the `appUrlOpen` event
     App.addListener('appUrlOpen', ({ url }) => {
      // Must run inside an NgZone for Angular to pick up the changes
      // https://capacitorjs.com/docs/guides/angular
      this.ngZone.run(() => {
        if (url?.startsWith(callbackUri)) {
          // If the URL is an authentication callback URL..
          if (
            url.includes('state=') &&
            (url.includes('error=') || url.includes('code='))
          ) {
            // Call handleRedirectCallback and close the browser
            this.auth
              .handleRedirectCallback(url)
              .pipe(mergeMap(() => Browser.close()))
              .subscribe();
          } else {
            Browser.close();
          }
        }
      });
    });
  }

  registrarse(){
    this.auth.loginWithRedirect({ login_hint: 'signup' });
  }

  loginWithRedirect(): void {
    // Call this to redirect the user to the login page
    this.auth.loginWithRedirect({ login_hint: "signup" });
  }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }


  async openInAppBrowserExample() {
    await Browser.open({ url: 'http://capacitorjs.com/' });
  }

  login() {
    this.auth
    .buildAuthorizeUrl()
    .pipe(mergeMap((url) => Browser.open({ url, windowName: '_self' })))
    .subscribe();
  }

  logout2() {
    // Use the SDK to build the logout URL
    this.auth
      .buildLogoutUrl({ returnTo })
      .pipe(
        tap((url) => {
          // Call the logout fuction, but only log out locally
          this.auth.logout({ localOnly: true });
          // Redirect to Auth0 using the Browser plugin, to clear the user's session
          Browser.open({ url });
        })
      )
      .subscribe();
  }

}
