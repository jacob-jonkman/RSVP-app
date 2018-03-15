import {Component, Input, OnInit} from '@angular/core';
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
  @Input() newActivityDialog: boolean;
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
    this.activityService.addActivity(newActivity);

    // TODO: Zet newActivityDialog weer op false
  }
}
