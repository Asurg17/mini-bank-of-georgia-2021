import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BgValidators } from 'src/app/bg-validators';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    console.log(this.form);

    this.register();
  }

  register(){
    
  }

  initForm(){ 
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
