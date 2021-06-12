import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BgValidators } from 'src/app/shared/bg-validators';
import { AuthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-bpm001',
  templateUrl: './bpm001.component.html',
  styleUrls: ['./bpm001.component.scss']
})
export class Bpm001Component implements OnInit {

  form: FormGroup;
  client: {};
  error;
  
  constructor(private authorizedService: AuthorizedService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(){
    if(this.form.invalid){
      return;
    }

    this.registerClient();
  }

  registerClient(){
    this.authorizedService.registerClient(this.form.value.firstname, this.form.value.lastname, this.form.value.plusPoints)
      .subscribe(response => {
        this.client = response;
        this.router.navigate(['/krn/krnicp']);
      }, error => {
        this.error = error.error;
      });
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
