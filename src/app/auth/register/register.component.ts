import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { BgValidators } from 'src/app/shared/bg-validators';
import { AuthorizationService } from 'src/app/shared/servicies/authorization.service';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private authorizationService: AuthorizationService, private router: Router, private alertService: AlertService) {}

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.register();
  }

  register() {
    this.authorizationService.register(this.form.value.wholename, this.form.value.username, this.form.value.userData.password)
      .subscribe(response => {
        this.form.reset();
        this.router.navigate(['/']);
      }, error => {
        this.alertService.error = error;
      });
  }

  initForm() { 
    this.form = new FormGroup({
      wholename: new FormControl(undefined, [
        BgValidators.required,
        BgValidators.minimumSizeValidator.bind(this),
        BgValidators.maximumSizeValidator.bind(this)
      ]),
      username: new FormControl(undefined, [
        BgValidators.required,
        BgValidators.minimumSizeValidator.bind(this),
        BgValidators.maximumSizeValidator.bind(this),
        BgValidators.spacesValidator.bind(this)
      ]),
      userData: new FormGroup({
        password: new FormControl(undefined, [
          BgValidators.required, 
          BgValidators.minimumSizeValidator.bind(this),
          BgValidators.maximumSizeValidator.bind(this)
        ]),
        repPassword: new FormControl(undefined, [BgValidators.required,
          BgValidators.minimumSizeValidator.bind(this),
          BgValidators.maximumSizeValidator.bind(this)
        ])
      }, BgValidators.equalityValidation.bind(this))
    });
  }
  
}
