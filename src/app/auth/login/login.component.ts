import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BgValidators } from 'src/app/bg-validators';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    console.log(this.form)
  }

  initForm(){
    this.form = new FormGroup({
      username: new FormControl(undefined, [BgValidators.required, BgValidators.minimumSizeValidator.bind(this),
                                            BgValidators.maximumSizeValidator.bind(this), BgValidators.spacesValidator.bind(this)]),
      password: new FormControl(undefined, [BgValidators.required, BgValidators.minimumSizeValidator.bind(this), BgValidators.maximumSizeValidator.bind(this)])
    });
  }

}
