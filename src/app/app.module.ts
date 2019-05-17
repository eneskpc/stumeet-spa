import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SystemParams } from './SystemParams';
import { JwtModule } from '@auth0/angular-jwt';
import { ChatComponent } from './chat/chat.component';
import { MomentPipe } from './pipes/moment.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

export function tokenGetter() {
   return localStorage.getItem(SystemParams.tokenKey);
}
@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      MainLayoutComponent,
      PublicLayoutComponent,
      LoginComponent,
      EventsComponent,
      ChatComponent,
      MomentPipe,
      PageNotFoundComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: [],
            blacklistedRoutes: []
         }
      })
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
