import {Component, Input, OnInit} from '@angular/core';
import { Activity } from '../activity';
import {LoginService} from '../login.service';
import {ActivitiesService} from '../activities.service';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.css']
})
export class ActivityCardComponent implements OnInit {
  @Input() activity: Activity;
  constructor(public loginService: LoginService, public activitiesService: ActivitiesService) {
  }

  ngOnInit() {
  }

  canEdit(activityCreator: string): boolean {
    return this.activitiesService.canEdit(activityCreator);
  }

  benErbij() {
    this.activitiesService.addAanwezigheid(this.activity);
  }

  alBij(): boolean {
    return this.activitiesService.alBij(this.activity);
  }

  nietMeerBij() {
    this.activitiesService.cancelAanwezigheid(this.activity);
  }
}
