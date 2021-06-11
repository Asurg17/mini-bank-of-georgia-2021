import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UnauthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  accounts = []
  clientKey: Number;
  error;

  constructor(public unauthorizedService: UnauthorizedService, private router: Router) { }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts() {
    this.unauthorizedService.fetchAccounts(267)
      .subscribe((response: any) => { 
        this.accounts = response;
      }, error => {
        this.error = error;
        console.log(error);
      });
  }

  removeAccount(accountKey: number){
    this.unauthorizedService.removeAccount(accountKey)
      .subscribe(response =>  {
        this.accounts = this.accounts.filter(account => account.accountKey !== accountKey);
        console.log(response);
      }, error => {
        this.error = error;
        console.log(error);
      });
  }

}