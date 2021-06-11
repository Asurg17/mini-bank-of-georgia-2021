import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public active = 0;

    useLoader = <T>(obs: Observable<T>): Observable<T> =>{
        this.startLoader();
        return obs.pipe(finalize(() => {
            this.stopLoader();
        }));
    }

    startLoader(){
        this.active ++;
    }

    stopLoader(){
        this.active = Math.max(this.active-1, 0);
    }

}
