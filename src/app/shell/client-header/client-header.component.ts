import { Component, OnInit } from '@angular/core';
import { AuthorizedService } from 'src/app/shared/servicies/authorized.service';

@Component({
  selector: 'bg-client-header',
  templateUrl: './client-header.component.html',
  styleUrls: ['./client-header.component.scss']
})
export class ClientHeaderComponent implements OnInit {

  firstname: string;
  lastName: string;
  image: string;
  clientKey: number;
  sumAmount: number;
  plusPoints:	number;

  constructor(public authorizedService: AuthorizedService) { }

  ngOnInit(): void {
    this.getClientInfo();
  }

  removeClient(){
    this.authorizedService.removeClient();
  }

  getClientInfo(){
    this.authorizedService.client.subscribe(client => {
      if(client){
        this.firstname = client.firstname;
        this.lastName = client.lastName;
        this.image = client.image;
        this.clientKey = client.clientKey;
        this.sumAmount = client.sumAmount;
        this.plusPoints = client.plusPoints;
      }
    });
  }

}
