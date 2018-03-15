import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {Activity} from './activity';
import {Observable} from 'rxjs/Observable';
import {LoginService} from './login.service';
import {Router} from '@angular/router';

const compareFn = (a, b) => {
  if (a.unwrappedName < b.unwrappedName) {
    return -1;
  }
  if (a.unwrappedName > b.unwrappedName) {
    return 1;
  }
  return 0;
};

@Injectable()
export class ActivitiesService {
  readonly path = 'Activities';

  activities: AngularFirestoreCollection<Activity>;
  activity: Activity;

  constructor(private db: AngularFirestore, private router: Router, private loginService: LoginService) {}

  getActivities(): Observable<Activity[]> {
    return this.db.collection<Activity>(this.path).snapshotChanges()
      .map(actions => actions.sort(compareFn))
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Activity;
          const id = a.payload.doc.id;
          return { ...data, id };
        }).filter(a => {
          const date = new Date(a.date);
          console.log('huidige datum: ' + Date() + ' datum:' + date);
          if (date > new Date()) {
            return a;
          }
        });
    });
  }

  getActivity(id: string): Observable<Activity> {
    return this.db.collection(this.path).doc<Activity>(id).valueChanges();
  }

  addAanwezigheid(activity: Activity): boolean {
    const username = this.loginService.getUsername();
    if (activity.attendees.indexOf(username) > -1) {
      return false;
    } else if (activity.attendees === null) {
      activity.attendees = [username];
    } else {
      activity.attendees.push(username);
    }
    this.updateActivity(activity);
    return true;
  }

  cancelAanwezigheid(activity: Activity): boolean {
    const username: string = this.loginService.getUsername();
    const index: number = activity.attendees.indexOf(username);
    if (index < 0) {
      return false;
    }
    activity.attendees.splice(index, 1);
    this.updateActivity(activity);
    return true;
  }

  alBij(activity: Activity): boolean {
    return (activity.attendees.indexOf(this.loginService.getUsername()) > -1);
  }

  addActivity(activity: Activity) {
    this.db.collection<Activity>(this.path).add(JSON.parse(JSON.stringify(activity)))
      .then(() => console.log('Toevoegen gelukt!'))
      .catch(() => console.log('Toevoegen mislukt...'));
  }

  updateActivity(activity: Activity) {
    this.db.collection<Activity>(this.path).doc(activity.id).update(activity)
      .then(() => this.router.navigate(['/activities']))
      .catch(() => console.log('ERROR! bij het updaten van activiteit'));
  }

  deleteActivity(activity: Activity) {
     this.db.collection(this.path).doc(activity.id).delete()
       .then(() => this.router.navigate(['/activities']))
       .catch(() => console.log('Verwijderen mislukt'));
  }

  canEdit(activityCreator: string): boolean {
    const username = this.loginService.getUsername();
    if (username === activityCreator || this.loginService.userIsBoardMember(username)) {
      return true;
    } else {
      return false;
    }
  }
}
