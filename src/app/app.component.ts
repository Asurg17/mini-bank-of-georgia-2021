import { Component, OnInit } from '@angular/core';
import { AlertService } from './shared/alert/alert.service';

import { AuthorizationService } from './shared/servicies/authorization.service';

@Component({
  selector: 'bg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Levan';

  constructor(private authorizationService: AuthorizationService, public alertService: AlertService) { }

  ngOnInit(): void {
    this.authorizationService.autoLogin();
  }

}
