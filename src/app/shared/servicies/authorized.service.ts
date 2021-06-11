import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoaderService } from "../loader/loader.service";
@Injectable({
    providedIn: 'root'
})
export class UnauthorizedService{
    
    isLoading = false;
    error$ = new Subject();

    constructor(private http: HttpClient, private loader: LoaderService){}

    createAccount(clientKey:number, accountName:string, amount:number){
      return this.http.put('accounts', {
        clientKey, accountName, amount
      }).pipe(
        this.loader.useLoader,
        catchError(err => throwError(err.error))
      );
    }

    fetchAccounts(clientKey:number){
      let params = new HttpParams();
      if(clientKey != null) params = params.append('clientKey', '' + clientKey);

      return this.http.get('accounts', { params })
        .pipe(
          this.loader.useLoader,
          catchError(err => throwError(err.error))
        );
    }

    removeAccount(accountKey:number){
      let params = new HttpParams();
      params = params.append('accountKey', '' + accountKey);

      return this.http.delete('accounts', { params })
        .pipe(
          this.loader.useLoader,
          catchError(err => throwError(err.error))
        );
    }

    transferMoney(senderAccountKey:string, receiverAccountKey:string, amount:number){
      return this.http.post('transfer', {
        senderAccountKey, receiverAccountKey, amount
      }).pipe(
        this.loader.useLoader,
        catchError(err => throwError(err.error))
      );
    }

    getClients(firstname: string, lastname: string, clientkey: number){
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

    registerClient(firstName: string, lastName: string, plusPoints: number){
      return this.http.put('clients', {
        firstName, lastName, plusPoints
      }).pipe(
        this.loader.useLoader,
        catchError(err => throwError(err.error))
      );
    }

}
