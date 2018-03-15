import { Component, OnInit } from '@angular/core';
import {Activity} from '../activity';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {ActivitiesService} from '../activities.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent implements OnInit {
  activity$: Observable<Activity>;

  constructor(private route: ActivatedRoute, public activitiesService: ActivitiesService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.activity$ = this.activitiesService.getActivity(id);
  }

  updateActivity(activity: Activity) {
    this.activitiesService.updateActivity(activity);
  }

  deleteActivity(activity: Activity) {
    this.activitiesService.deleteActivity(activity);
  }
}
