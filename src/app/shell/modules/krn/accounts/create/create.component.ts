import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BgValidators } from 'src/app/shared/bg-validators';
import { AuthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  error;

  constructor(public authorizedService: AuthorizedService, private router: Router) {}

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.createAccount();
  }

  createAccount() {
    this.authorizedService.createAccount(this.form.value.account, this.form.value.amount)
      .subscribe(response => {
        this.authorizedService.fetchClientInfo();
        this.form.reset();
        this.router.navigate(['krn/accounts']);
      }, error => {
        this.error = error;
      });
  }

  initForm() {
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
