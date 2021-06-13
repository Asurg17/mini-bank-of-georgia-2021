import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ClientResponseModel } from "src/app/shared/models/client-response.model";
import { ClientModel } from "../models/client.model";
import { LoaderService } from "../loader/loader.service";


@Injectable({
    providedIn: 'root'
})
export class AuthorizedService{

    client = new BehaviorSubject<ClientModel>(null);
    
    isLoading = false;
    isVisibleClientHeader = false;

    constructor(private http: HttpClient, private router: Router, private loader: LoaderService){}

    handleClient = (clientResponse: ClientResponseModel) => {
      if (clientResponse) {
        const client = new ClientModel(
          clientResponse.firstName,
          clientResponse.lastName,
          clientResponse.image,
          clientResponse.clientKey,
          clientResponse.sumAmount,
          clientResponse.plusPoints
        );
        this.client.next(client);
        localStorage.setItem('client', JSON.stringify(client));
        this.isVisibleClientHeader = true;
      }
    }

    getClients(firstname: string, lastname: string, clientkey: number) {
      let params = new HttpParams();
      params = params.append('firstName', firstname);
      params = params.append('lastName', lastname);
      params = params.append('clientKey', '' + clientkey);

      return this.http.get('clients', { params })
        .pipe(
          this.loader.useLoader,
          catchError(err => throwError(err.error))
        );
    }

    registerClient(firstName: string, lastName: string, plusPoints: number) {
      return this.http.put('clients', {
          firstName, lastName, plusPoints
        }).pipe(
          this.loader.useLoader,
          catchError(err => throwError(err.error)),
          tap(this.handleClient)
        );
    } 
    
    fetchClientInfo() {
      let clientKey = this.getClientKey();
      if (clientKey) {
        let params = new HttpParams();
        params = params.append('clientKey', '' + clientKey);

        this.http.get('clients', { params })
          .pipe(
            this.loader.useLoader
          ).subscribe(response => {
            this.handleClient(response[0]);
          });
      }
    }

    removeClient() {
      this.client.next(null);
      localStorage.removeItem('client');
      this.isVisibleClientHeader = false;
      this.router.navigate(['/']);
    }

    createAccount(accountName:string, amount:number) {
      var clientKey = this.getClientKey();

      return this.http.put('accounts', {
        clientKey, accountName, amount
      }).pipe(
        this.loader.useLoader,
        catchError(err => throwError(err.error))
      );
    }

    // If forUser is true then fetch only users accounts
    // if false fetch all acounts that exists
    fetchAccounts(forUser: boolean) {
      let clientKey;
      if (forUser) {
        clientKey = this.getClientKey();
      }

      let params = new HttpParams();
      if (clientKey != null) params = params.append('clientKey', '' + clientKey);

      return this.http.get('accounts', { params })
        .pipe(
          this.loader.useLoader,
          catchError(err => throwError(err.error))
        );
    }

    removeAccount(accountKey:number) {
      let params = new HttpParams();
      params = params.append('accountKey', '' + accountKey);

      return this.http.delete('accounts', { params })
        .pipe(
          this.loader.useLoader,
          catchError(err => throwError(err.error))
        );
    }

    transferMoney(senderAccountKey:string, receiverAccountKey:string, amount:number) {
      return this.http.post('transfer', {
        senderAccountKey, receiverAccountKey, amount
      }).pipe(
        this.loader.useLoader,
        catchError(err => throwError(err.error))
      );
    }

    getClientKey() {
      const client = JSON.parse(localStorage.getItem('client'));
      if (client) return client.clientKey;
      return null;
    }

}
