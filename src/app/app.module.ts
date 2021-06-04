import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { ShellComponent } from './shell/shell.component';
import { ShellHeaderComponent } from './shell/shell-header/shell-header.component';
import { ShellSidebarComponent } from './shell/shell-sidebar/shell-sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ClientHeaderComponent } from './shell/client-header/client-header.component';
import { Bpm000Component } from './shell/modules/bpm/bpm000/bpm000.component';
import { Bpm001Component } from './shell/modules/bpm/bpm001/bpm001.component';
import { KrnicpComponent } from './shell/modules/krn/krnicp/krnicp.component';
import { OperationsComponent } from './shell/modules/krn/operations/operations.component';
import { Pmd311Component } from './shell/modules/pmd/pmd311/pmd311.component';
import { AccountsComponent } from './shell/modules/krn/accounts/accounts.component';
import { CreateComponent } from './shell/modules/krn/accounts/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ShellComponent,
    ShellHeaderComponent,
    ShellSidebarComponent,
    LoginComponent,
    RegisterComponent,
    ClientHeaderComponent,
    Bpm000Component,
    Bpm001Component,
    KrnicpComponent,
    OperationsComponent,
    Pmd311Component,
    AccountsComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
