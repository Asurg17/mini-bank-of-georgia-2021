import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BgValidators } from 'src/app/bg-validators';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {

  form: FormGroup;
  
  constructor() { }

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
      firstname: new FormControl(undefined, [BgValidators.required, BgValidators.minimumSizeValidator.bind(this), BgValidators.maximumSizeValidator.bind(this)]),
      lastname: new FormControl(undefined, [BgValidators.required, BgValidators.minimumSizeValidator.bind(this), BgValidators.maximumSizeValidator.bind(this)]),
      plusPoints: new FormControl(undefined, BgValidators.minimalNumberValidation.bind(this))
    });
  }

}
