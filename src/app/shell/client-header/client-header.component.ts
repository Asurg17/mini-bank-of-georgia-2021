import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {

  isVisible = true;

  num = 1000;

  constructor() { }

  ngOnInit(): void {
  }

  hideClientHeader(){
    this.isVisible = !this.isVisible
  }

}
