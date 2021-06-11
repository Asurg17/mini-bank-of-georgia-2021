import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BgValidators } from 'src/app/bg-validators';
import { UnauthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  account: {};
  error;

  constructor(public unauthorizedService: UnauthorizedService, private router: Router) {}

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.unauthorizedService.createAccount(267, this.form.value.account, this.form.value.amount).subscribe(
      (response: any) =>  {
          this.account = response;
          this.router.navigate(['krn/accounts']);
          console.log(response);
      }, error => {
        this.error = error.error;
      });
  }

  initForm(){
    this.form = new FormGroup({
      account: new FormControl(undefined, [
        BgValidators.required,
        BgValidators.minimumSizeValidator.bind(this),
        BgValidators.maximumSizeValidator.bind(this)
      ]),
      amount: new FormControl(undefined, BgValidators.minimalNumberValidation.bind(this))
    });
  }

}
