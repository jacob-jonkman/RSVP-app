import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { OverlayModule } from '@angular/cdk/overlay';
import { LoginService } from './login.service';
import { ActivitiesService } from './activities.service';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { ActivitiesDashboardComponent } from './activities-dashboard/activities-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { NewActivityFormComponent } from './new-activity-form/new-activity-form.component';
import { ActivityInfoComponent } from './activity-info/activity-info.component';
import { ActivityEditComponent } from './activity-edit/activity-edit.component';

const appRoutes: Routes = [
  { path: 'activities', component: ActivitiesDashboardComponent },
  { path: 'info/:id', component: ActivityInfoComponent },
  { path: 'edit/:id', component: ActivityEditComponent },
  { path: '', pathMatch: 'full', component: LoginComponent }
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
    OverlayModule
  ],
  providers: [
    LoginService,
    AngularFireAuthModule,
    ActivitiesService
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ActivitiesDashboardComponent,
    NavbarComponent,
    ActivityCardComponent,
    NewActivityFormComponent,
    ActivityInfoComponent,
    ActivityEditComponent,
  ],
  bootstrap: [ AppComponent ],
})

export class AppModule {}
