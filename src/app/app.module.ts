import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { PopupDirective } from './shell/shell-header/popup/popup.directive';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { ValidationMessageComponent } from './shared/validation-message/validation-message.component';
import { StyleNumberPipe } from './shared/style-number.pipe';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterceptorService } from './shared/servicies/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder.directive';

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
    CreateComponent,
    PopupDirective,
    NotFoundComponent,
    ValidationMessageComponent,
    StyleNumberPipe,
    LoaderComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
