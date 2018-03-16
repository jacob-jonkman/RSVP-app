import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Time} from '@angular/common';
import {Activity} from '../activity';
import {ActivitiesService} from '../activities.service';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-new-activity-form',
  templateUrl: './new-activity-form.component.html',
  styleUrls: ['./new-activity-form.component.css']
})
export class NewActivityFormComponent implements OnInit {
  @Output() toggleActDialog = new EventEmitter();

  name: string;
  date: Date;
  time: Time;
  address: string;
  homeOf: string;
  description: string;

  constructor(public activityService: ActivitiesService, public loginService: LoginService) { }

  ngOnInit() {
  }

  addActivity() {
    const date: Date = new Date(this.date);
    date.setHours(parseInt(this.time.toString().substr(0, 2), 10));
    date.setMinutes(parseInt(this.time.toString().substr(3, 2), 10));

    console.log('hours: ' + parseInt(this.time.toString().substr(0, 2), 10));
    console.log('minutes: ' + parseInt(this.time.toString().substr(3, 2), 10));

    console.log(
      date.getFullYear()
      + '-' + (date.getMonth() + 1)
      + '-' + date.getDate()
      + ' ' + date.getHours()
      + ':' + date.getMinutes()
    );
    const activityDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      0,
      0,
    );
    console.log('activityDate:' + activityDate, ' with type: ' + typeof(activityDate));
    if (isNaN(activityDate.getTime())) {
      return;
    }
    const newActivity = new Activity(
      this.name,
      activityDate,
      this.address,
      this.homeOf,
      this.description,
      [],
      this.loginService.getUsername()
    );
    this.activityService.addActivity(newActivity);
  }
}
