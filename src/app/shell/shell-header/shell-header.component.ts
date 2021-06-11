import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/shared/servicies/authorization.service';

@Component({
  selector: 'bg-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {

  loggedIn = false;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.authorizationService.user.subscribe(user => {
      this.loggedIn = !!user?.token;
    });
  }

  logOut(){
    this.authorizationService.logout();
  }

}
