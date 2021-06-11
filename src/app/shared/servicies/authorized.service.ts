import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
@Injectable({
    providedIn: 'root'
})
export class UnauthorizedService{
    
    isLoading = false;
    error$ = new Subject();

    constructor(private http: HttpClient){}

    withLoading(obs: Observable<any>): Observable<any>{
        return new Observable(observer => {
          this.isLoading = true;
          obs.subscribe(resp => {
            this.isLoading = false;
            observer.next(resp);
          }, error => {
            this.isLoading = false;
            observer.error(error);
          });
        });
    }

    createAccount(clientKey:number, account:string, amount:number){
        return this.withLoading(this.http.put('accounts',
                    {
                      clientKey: clientKey,
                      accountName: account,
                      amount:	amount
                    })).pipe();
    }

    fetchAccounts(clientKey:number){
        
        let params = new HttpParams();

        if(clientKey != null){
            params = params.append('clientKey', '' + clientKey);
        }

        return this.withLoading(this.http.get('accounts', { params })).pipe(catchError(err => {
            return throwError(err.error)
        }));
    }

    removeAccount(accountKey:number){

        let params = new HttpParams();
        params = params.append('accountKey', '' + accountKey);

        return this.withLoading(this.http.delete('accounts', { params })).pipe();
    }

    transferMoney(sender:string, receiver:string, amount:number){
        return this.withLoading(this.http.post('transfer',
                        {
                          senderAccountKey:	sender,
                          receiverAccountKey: receiver,
                          amount: amount
                        })).pipe();
    }

    getClients(firstname: string, lastname: string, clientkey: number){

        let params = new HttpParams();
        params = params.append('firstName', firstname);
        params = params.append('lastName', lastname);
        params = params.append('clientKey', '' + clientkey);

        return this.withLoading(this.http.get('clients', { params })).pipe();
    }

    registerClient(firstname: string, lastname: string, plusPoints: number){
        return this.withLoading(this.http.put('clients',
                  {
                    firstName: firstname,
                    lastName: lastname,
                    plusPoints: plusPoints
                  })).pipe();
    }
}
