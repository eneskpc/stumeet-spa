import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [{
      path: '',
      component: WelcomeComponent
    }, {
      path: 'giris',
      component: LoginComponent
    }, {
      path: 'uye-ol',
      component: RegisterComponent
    }, {
      path: '**',
      component: PageNotFoundComponent
    }]
  }, {
    path: '',
    component: MainLayoutComponent,
    children: [{
      path: 'haber-kaynagi',
      component: HomeComponent
    }, {
      path: 'etkinlikler',
      component: EventsComponent
    }, {
      path: 'sohbet/:id',
      component: ChatComponent
    }, {
      path: 'sohbet',
      component: ChatComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
