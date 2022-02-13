import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Auth0
import { AuthModule } from '@auth0/auth0-angular';
import { PublicComponent } from './components/public/public.component';
import { PrivateComponent } from './components/private/private.component';
import { callbackUri } from '../auth.config';

const redirectUri = callbackUri;

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    PrivateComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-o06c7mkq.us.auth0.com',
      clientId: 'cK5uH18RiJKMtvefcGmNFphx8JR6ps8W',
      redirectUri,
      cacheLocation: 'localstorage', //Si el usuario refresca la página perdemos la sesion, con esto lo evitamos
      useRefreshTokens: true //Esto solo es para pruebas, ya que nos saltamos la caducidad de la sesion
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
