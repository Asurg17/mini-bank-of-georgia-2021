import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UnauthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-bpm000',
  templateUrl: './bpm000.component.html',
  styleUrls: ['./bpm000.component.scss']
})
export class Bpm000Component implements OnInit {

  form: FormGroup;
  called = false;
  clients = [];
  error;

  constructor(public unauthorizedService: UnauthorizedService, private router: Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  onSubmit(){
    this.getClients();
  }
  
  getClients(){
    var firstname = this.form.value.firstname;
    var lastname = this.form.value.lastname;
    var clientkey = this.form.value.id;

    if(firstname == null) firstname=""
    if(lastname == null) lastname=""
    if(clientkey == null) clientkey=""

    this.unauthorizedService.getClients(firstname, lastname, clientkey)
      .subscribe((response: any) => {
        this.called = true;
        this.clients = response;
        console.log(response);
      }, error => {
        this.error = error;
        console.log(error);
      });
  }

  forwardToClientPage(client: any){
    console.log(client);
    this.router.navigate(['/krn/krnicp']);
  }

  initForm(){
    this.form = new FormGroup({
      firstname: new FormControl(undefined),
      lastname: new FormControl(undefined),
      id: new FormControl(undefined)
    });
  }

}