import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { BgValidators } from 'src/app/shared/bg-validators';
import { AuthorizationService } from 'src/app/shared/servicies/authorization.service';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  error;

  constructor(private authorizationService: AuthorizationService, private router: Router) {}

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    
    this.login();
  }

  login() {
    this.authorizationService.login(this.form.value.username, this.form.value.password)
      .subscribe(response => {
        this.form.reset();
        this.router.navigate(['/']);
      }, error => {
        this.error = error;
      });
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl(undefined, [
        BgValidators.required, 
        BgValidators.minimumSizeValidator.bind(this),
        BgValidators.maximumSizeValidator.bind(this),
        BgValidators.spacesValidator.bind(this)
      ]),
      password: new FormControl(undefined, [
        BgValidators.required, 
        BgValidators.minimumSizeValidator.bind(this), 
        BgValidators.maximumSizeValidator.bind(this)
      ])
    });
  }

}
