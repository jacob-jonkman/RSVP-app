import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';
import { ActivitiesDashboardComponent } from './activities-dashboard/activities-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'activities', component: ActivitiesDashboardComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
  ],
  providers: [
    LoginService,
    AngularFireAuthModule
  ],
  exports: [
    RouterModule,
  ],
  declarations: [ AppComponent, LoginComponent, ActivitiesDashboardComponent, NavbarComponent, ActivityCardComponent ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
