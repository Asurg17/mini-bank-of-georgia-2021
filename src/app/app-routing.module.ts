import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Bpm000Component } from './shell/modules/bpm/bpm000/bpm000.component';
import { Bpm001Component } from './shell/modules/bpm/bpm001/bpm001.component';
import { AccountsComponent } from './shell/modules/krn/accounts/accounts.component';
import { CreateComponent } from './shell/modules/krn/accounts/create/create.component';
import { KrnicpComponent } from './shell/modules/krn/krnicp/krnicp.component';
import { OperationsComponent } from './shell/modules/krn/operations/operations.component';
import { Pmd311Component } from './shell/modules/pmd/pmd311/pmd311.component';
import { NotFoundComponent } from './shell/not-found/not-found.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'bpm',
        children: [
          {
            path: 'bpm000',
            component: Bpm000Component
          },
          {
            path: 'bpm001',
            component: Bpm001Component
          }
        ]
      },
      {
        path: 'krn',
        children: [
          {
            path: 'accounts',
            component: AccountsComponent,
          },
          {
            path: 'accounts/create',
            component: CreateComponent
          },
          {
            path: 'krnicp',
            component: KrnicpComponent
          },
          {
            path: 'operations',
            component: OperationsComponent
          }
        ]
      },
      {
        path: 'pmd',
        children: [
          {
            path: 'pmd311',
            component: Pmd311Component
          }
        ]
      }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
