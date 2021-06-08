import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BgValidators } from 'src/app/bg-validators';

@Component({
  selector: 'bg-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

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
      account: new FormControl(undefined, [BgValidators.required, BgValidators.minimumSizeValidator.bind(this), BgValidators.maximumSizeValidator.bind(this)]),
      amount: new FormControl(undefined, BgValidators.minimalNumberValidation.bind(this))
    });
  }

}
