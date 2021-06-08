import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bg-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent implements OnInit {

  @Input()
  control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  errors(){
    return this.control?.errors && Object.values(this.control?.errors);
  }

}
