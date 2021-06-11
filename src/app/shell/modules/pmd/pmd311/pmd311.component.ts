import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BgValidators } from 'src/app/bg-validators';
import { UnauthorizedService } from 'src/app/shared/servicies/authorized.service';

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

  constructor(public unauthorizedService: UnauthorizedService, private router: Router) {}

  ngOnInit(): void {
    this.initForm()

    this.fetchClientAccounts();
    this.fetchAllAccounts();
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    
    this.unauthorizedService.transferMoney(this.form.value.sender, this.form.value.receiver, this.form.value.amount).subscribe(
      (response: any) =>  {
        this.router.navigate(['/krn/accounts']); 
        console.log(response);
      }, error => {
        this.error = error.error;
        console.log(this.error);
      }
    );
  }

  fetchClientAccounts() {
    this.unauthorizedService.fetchAccounts(267).subscribe(
      (response: any) =>  { 
        this.clientAccounts = response;
      }
    );
  }

  fetchAllAccounts(){
    this.unauthorizedService.fetchAccounts(null).subscribe(
      (response: any) =>  { 
        this.allAccounts = response;
        console.log(response);
      }
    );
  }


  initForm(){
    this.form = new FormGroup({
      sender: new FormControl(undefined, BgValidators.required),
      receiver: new FormControl(undefined, BgValidators.required),
      amount: new FormControl(undefined, BgValidators.minimalNumberValidation.bind(this))
    });
  }

}
