import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  constructor() {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Utility' }, { label: 'Starter Page', active: true }];
  }
}
