import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {

  isVisible = true;

  constructor() { }

  ngOnInit(): void {
  }

  hideClientHeader(){
    this.isVisible = !this.isVisible
  }

}
