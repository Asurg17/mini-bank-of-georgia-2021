import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnauthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit, OnDestroy {

  accounts = []
  clientKey: Number;
  error;
  errorSubscription: Subscription;

  constructor(public unauthorizedService: UnauthorizedService, private router: Router) { }
  ngOnDestroy(): void {
    this.errorSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchAccounts();
    this.errorSubscription = this.unauthorizedService.error$.subscribe(error => {
      this.error = error;
    });
  }

  fetchAccounts() {
    this.unauthorizedService.fetchAccounts(267).subscribe(
      (response: any) =>  { 
        this.accounts = response;
      }, error => {
        this.error = error;
      }
    );
  }

  removeAccount(accountKey: number){
    this.unauthorizedService.removeAccount(accountKey).subscribe(
      (response: any) =>  {
        this.accounts = this.accounts.filter(account => account.accountKey !== accountKey);
        console.log(response);
      }, error => {
        this.error = error.error;
      }
    );
  }

}
