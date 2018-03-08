import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-activities-dashboard',
  templateUrl: './activities-dashboard.component.html',
  styleUrls: ['./activities-dashboard.component.css']
})

export class ActivitiesDashboardComponent implements OnInit {
  activities: Observable<any[]>;
  db: AngularFirestore;

  constructor(db: AngularFirestore, public router: Router, public loginService: LoginService) {
    this.db = db;
  }
  ngOnInit() {
    if (this.loginService.getUserObservable() == null) {
      this.router.navigate([''])
        .then(() => console.log('Not logged in, returning to homepage'))
        .catch(function(error) {
          console.log('ERROR! ' + error.code + ':' + error.message);
          return null;
        });
    }
    this.activities = this.getActivities();
  }

  getActivities() {
    return this.db.collection('Activities').valueChanges(); // TODO: use snapshotChanges when need arises
  }

}
