import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {ActivitiesService} from '../activities.service';
import {Activity} from '../activity';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-activities-dashboard',
  templateUrl: './activities-dashboard.component.html',
  styleUrls: ['./activities-dashboard.component.css']
})

export class ActivitiesDashboardComponent implements OnInit {
  activities: Observable<Activity[]>;
  db: AngularFirestore;
  newActivityDialog: boolean;

  constructor(
    public router: Router,
    public loginService: LoginService,
    public activityService: ActivitiesService
  ) {
    this.newActivityDialog = false;
  }
  ngOnInit() {
    if (this.loginService.getUser() == null) {
        this.router.navigate([''])
          .then(() => console.log('Not logged in, returning to homepage. observable'))
          .catch(function(error) {
            console.log('ERROR! ' + error.code + ':' + error.message);
            return null;
          });
    }
    this.activities = this.getActivities();
  }

  getActivities(): Observable<Activity[]> {
    return this.activityService.getActivities();
  }

  newActivity() {
    this.newActivityDialog = true;
  }
}
