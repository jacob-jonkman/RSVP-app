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
    const activityDate = new Date(this.date + 'T' + this.time);
    const newActivity = new Activity(
      this.name,
      activityDate,
      this.address,
      this.homeOf,
      this.description,
      [],
      this.loginService.getUsername()
    );
    if (this.activityService.addActivity(newActivity)) {
      this.toggleActDialog.emit();
    }
  }
}
