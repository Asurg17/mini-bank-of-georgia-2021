import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    console.log(this.form)
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      username: new FormControl(undefined, Validators.required),
      password: new FormControl(undefined, Validators.required)
    });
  }

}
