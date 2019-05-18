import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { ChatComponent } from './chat/chat.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{
      path: '',
      component: HomeComponent
    }, {
      path: 'haber-kaynagi',
      component: HomeComponent
    }, {
      path: 'etkinlikler',
      component: EventsComponent
    }, {
      path: 'etkinlik/:id',
      component: EventDetailComponent
    }, {
      path: 'sohbet/:id',
      component: ChatComponent
    }, {
      path: 'sohbet',
      component: ChatComponent
    }]
  }, {
    path: '',
    component: PublicLayoutComponent,
    children: [{
      path: 'giris',
      component: LoginComponent
    }, {
      path: 'uye-ol',
      component: RegisterComponent
    }, {
      path: '**',
      component: PageNotFoundComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
