import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BgValidators } from 'src/app/shared/bg-validators';
import { AuthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-pmd311',
  templateUrl: './pmd311.component.html',
  styleUrls: ['./pmd311.component.scss']
})
export class Pmd311Component implements OnInit {

  form: FormGroup;
  clientAccounts: [];
  allAccounts: [];
  error;

  constructor(public authorizedService: AuthorizedService, private router: Router) {}

  ngOnInit(): void {
    this.initForm()
    this.fetchClientAccounts();
    this.fetchAllAccounts();
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.transferMoney();
  }

  transferMoney(){
    this.authorizedService.transferMoney(this.form.value.sender, this.form.value.receiver, this.form.value.amount)
      .subscribe(response  => {
        this.authorizedService.fetchClientInfo();
        this.router.navigate(['/krn/accounts']); 
        console.log(response);
      }, error => {
        this.error = error;
        console.log(error);
      });
  }

  fetchClientAccounts() {
    this.authorizedService.fetchAccounts(true)
      .subscribe((response: any) => { 
        this.clientAccounts = response;
      }, error => {
        this.error = error;
        console.log(error);
      });
  }

  fetchAllAccounts(){
    this.authorizedService.fetchAccounts(false)
      .subscribe((response: any) => { 
        this.allAccounts = response;
      }, error => {
        this.error = error;
        console.log(error);
      });
  }

  initForm(){
    this.form = new FormGroup({
      sender: new FormControl(undefined, BgValidators.required),
      receiver: new FormControl(undefined, BgValidators.required),
      amount: new FormControl(undefined, BgValidators.minimalNumberValidation.bind(this))
    });
  }

}
