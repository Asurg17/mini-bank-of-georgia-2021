import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService{

    constructor(private http: HttpClient) {}

    register(name: string, username: string, password: string){
        this.http.post('register', {
            name, username, password
        });
    }

}
