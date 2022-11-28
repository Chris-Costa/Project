import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { AZUREprofileComponent } from './azureprofile/azureprofile.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'AZUREprofile',
    component: AZUREprofileComponent,
  },
  {
      path: '',
      component: HomeComponent,
  }
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // Don't perform initial navigation in iframes or popups
   initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled' // Set to enabledBlocking to use Angular Universal
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }