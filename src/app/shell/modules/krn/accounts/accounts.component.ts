import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { AuthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts = [];

  constructor(public authorizedService: AuthorizedService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.authorizedService.fetchAccounts(true)
      .subscribe((response: any) => { 
        this.accounts = response;
      }, error => {
        this.alertService.error = error;
      });
  }

  removeAccount(accountKey: number) {
    this.authorizedService.removeAccount(accountKey)
      .subscribe(response =>  {
        this.authorizedService.fetchClientInfo();
        this.accounts = this.accounts.filter(account => account.accountKey !== accountKey);
      }, error => {
        this.alertService.error = error;
      });
    }
}
