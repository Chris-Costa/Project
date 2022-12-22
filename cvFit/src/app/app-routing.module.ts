import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AZUREprofileComponent } from './azureprofile/azureprofile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'AZUREprofile',
    component: AZUREprofileComponent,
    canActivate: [MsalGuard]
  },
  {
      path: '',
      component: HomeComponent,
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: !isIframe ? 'enabledBlocking' : 'disabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }