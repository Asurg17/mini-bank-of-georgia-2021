import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BgValidators } from 'src/app/bg-validators';
import { UnauthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {

  form: FormGroup;
  client: {};
  error;
  
  constructor(public unauthorizedService: UnauthorizedService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.unauthorizedService.registerClient(this.form.value.firstname, this.form.value.lastname, this.form.value.plusPoints).subscribe(
      response =>  {
        this.client = response;
        this.router.navigate(['krn/krnicp']);
        console.log(this.client);
      }, error => {
        this.error = error.error;
      }
    );

  }

  initForm(){
    this.form = new FormGroup({
      firstname: new FormControl(undefined, [
        BgValidators.required,
        BgValidators.minimumSizeValidator.bind(this),
        BgValidators.maximumSizeValidator.bind(this)
      ]),
      lastname: new FormControl(undefined, [
        BgValidators.required,
        BgValidators.minimumSizeValidator.bind(this),
        BgValidators.maximumSizeValidator.bind(this)
      ]),
      plusPoints: new FormControl(undefined, BgValidators.minimalNumberValidation.bind(this))
    });
  }

}
