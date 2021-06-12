import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts = [];
  error;

  constructor(public authorizedService: AuthorizedService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.authorizedService.fetchAccounts(true)
      .subscribe((response: any) => { 
        this.accounts = response;
      }, error => {
        this.error = error;
      });
  }

  removeAccount(accountKey: number){
    this.authorizedService.removeAccount(accountKey)
      .subscribe(response =>  {
        this.authorizedService.fetchClientInfo();
        this.accounts = this.accounts.filter(account => account.accountKey !== accountKey);
        console.log(response);
      }, error => {
        this.error = error;
        console.log(error);
      });
    }
}
