import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from 'src/app/shared/servicies/authorization.service';

@Component({
  selector: 'bg-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {

  name: string;
  username: string;
  image: string;

  constructor(private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.renderUserInfo();
  }

  renderUserInfo() {
    this.authorizationService.user.subscribe(user => {
      if (user) {
        this.name = user.name;
        this.username = user.username;
        this.image = user.image;
      }
    });
  }

}
