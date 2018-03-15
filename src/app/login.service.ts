import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {User, auth} from 'firebase/app';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoginService {
  constructor(public afAuth: AngularFireAuth) { }

  login(email, password): Promise<User | null> {
    if (this.getUser() != null) {
      console.log('was al ingelogd?');
    }
    return auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          console.log(auth().currentUser);
          auth().currentUser.updateProfile({displayName: 'Jacob', photoURL: ''});
          return of(auth().currentUser);
        }
      )
      .catch(function(error) {
        console.log('ERROR! ' + error.code + ':' + error.message);
        return null;
      });
  }

  logout(): Promise<boolean> {
    return auth().signOut()
      .then(
        () => {
          return true;
        })
    .catch(function(error) {
        console.log('ERROR! ' + error.code + ':' + error.message);
        return false;
    });
  }

  getUserObservable(): Observable<User> {
    return of(this.afAuth.auth.currentUser);
  }

  getUser(): User| null {
    return auth().currentUser;
  }

  getUsername(): string {
    return auth().currentUser.displayName;
  }

  userIsBoardMember(username: string): boolean {
    if (
      username === 'Jeffrey' ||
      username === 'Maaike' ||
      username === 'David' ||
      username === 'Jeanette'
    ) {
      return true;
    }
  }
}
