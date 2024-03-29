import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExerciseListComponent } from './exercises/exercise-list.component';
import { ExerciseDetailComponent } from './exercises/exercise-detail.component';
import { ContactUsComponent } from './contactForm/contactUs.component';
import { BlogComponent } from './blog/blog.component';
import { WorkoutListComponent } from './workoutList/workoutList.component';
import { PostComponent } from './blog/post/post.component';
import { DiscussionComponent } from './blog/discussion/discussion.component';
import { CalculatorComponent } from './macroCalculator/calculator.component';
import { MacroTableComponent } from './macroCalculator/macro-table.component';
import { AZUREprofileComponent } from './azureprofile/azureprofile.component';
import { HomeComponent } from './home/home.component';
import { MsalRedirectComponent, MsalInterceptor, MsalModule, MsalGuard } from '@azure/msal-angular';
import { WorkoutTitleComponent } from './workoutTitle/workoutTitle.component';
import { LiftComponent } from './lift/lift.component';

import { CalcService } from './macroCalculator/calculator.service';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { LiftAddComponent } from './exercises/addAsLift/lift-add.component';
import { environment } from 'src/environments/environment';
import { LiftEditComponent } from './lift/lift-edit.component';

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
    HomeComponent,
    WorkoutTitleComponent,
    LiftComponent,
    LiftAddComponent,
    LiftEditComponent
  ],
  imports: [
    AppRoutingModule,
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: environment.clientId,
        authority: environment.authority,
        redirectUri: '/',
        postLogoutRedirectUri: '/'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
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
      {path: 'blog/:id', component: DiscussionComponent},
      {path: 'calc', component: CalculatorComponent},
      {path: 'workoutlist', component: WorkoutListComponent},
      {path: 'workoutlist/:id', component: LiftComponent},
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