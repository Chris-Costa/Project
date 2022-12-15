import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { ExerciseListComponent } from './exercises/exercise-list.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail.component';
import { ContactUsComponent } from './form/contactUs.component';
import { BlogComponent } from './blog/blog.component';
import { WorkoutListComponent } from './exercises/workoutList/workoutList.component';
import { PostComponent } from './blog/post/post.component';
import { DiscussionComponent } from './blog/discussion/discussion.component';
import { CalculatorComponent } from './macroCalculator/calculator.component';
import { MacroTableComponent } from './macroCalculator/macro-table.component';
import { CalcService } from './macroCalculator/calculator.service';

import { MsalInterceptor, MsalModule, MsalRedirectComponent, MsalGuard } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { AZUREprofileComponent } from './azureprofile/azureprofile.component';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    ExerciseDetailComponent,
    ContactUsComponent,
    BlogComponent,
    WorkoutListComponent,
    PostComponent,
    DiscussionComponent,
    CalculatorComponent,
    MacroTableComponent,
    AZUREprofileComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.clientId, // Application (client) ID from the app registration
        authority: environment.authority,
        redirectUri: '/',// This is your redirect URI
        postLogoutRedirectUri: '/'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatCardModule,
    MatMenuModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    RouterModule.forRoot([
      {path: 'exercises', component: ExerciseListComponent},
      {path: 'exercises/:id', component: ExerciseDetailComponent},
      {path: 'welcome', component: HomeComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'blog', component: BlogComponent},
      {path: 'calc', component: CalculatorComponent},
      {path: 'workoutlist', component: WorkoutListComponent},
      {path: 'discussion/:id', component: DiscussionComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    CalcService,
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
