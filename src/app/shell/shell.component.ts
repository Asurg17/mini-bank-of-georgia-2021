import { Component, OnInit } from '@angular/core';
import { AuthorizedService } from '../shared/servicies/authorized.service';

@Component({
  selector: 'bg-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  get curDate() {
    const d = new Date();
    return `${('0' + d.getDate()).slice(-2)}/${('0' + (d.getMonth() + 1)).slice(-2)}/${d.getFullYear()}`;
  }

  constructor(private authorizedService: AuthorizedService) { }

  ngOnInit(): void {
    this.authorizedService.fetchClientInfo();
  }

}
