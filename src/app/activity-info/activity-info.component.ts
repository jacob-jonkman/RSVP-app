import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../activity';
import { ActivitiesService } from '../activities.service';
import { Observable } from 'rxjs/Observable';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.css']
})
export class ActivityInfoComponent implements OnInit {
  activity$: Observable<Activity>;
  aanwezigheidsString: string;
  constructor(private route: ActivatedRoute, public activitiesService: ActivitiesService, public loginService: LoginService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.activity$ = this.activitiesService.getActivity(id);
  }

  toggleAanwezigheid(activity) {
    if (this.activitiesService.alBij(activity)) {
      this.activitiesService.cancelAanwezigheid(activity);
      this.aanwezigheidsString = 'Bij!';
    } else {
      this.activitiesService.addAanwezigheid(activity);
      this.aanwezigheidsString = 'Niet meer bij';
    }
  }
  canEdit(activityCreator: string): boolean {
    return this.activitiesService.canEdit(activityCreator);
  }

  getAanwezigheidsString(activity): string {
    if (this.aanwezigheidsString == null) {
      if (this.activitiesService.alBij(activity)) {
        this.aanwezigheidsString = 'Niet meer bij';
      } else {
        this.aanwezigheidsString = 'Bij!';
      }
    }
    return this.aanwezigheidsString;
  }
}
