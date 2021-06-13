import { AbstractControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";

export class BgValidators extends Validators{

    static required(control: AbstractControl): ValidationErrors | null {
        return super.required(control) && { required: "აუცილებელი ველი" }
    }
  
    static minimumSizeValidator(control: AbstractControl): { [key: string]: any } {
      var size = String(control.value).length;
      if (size < 2) return { minimumSizeRestriction: "გთხოვთ შეიყვანოთ მინიმუმ 2 სიმბოლო" };
    }
  
    static maximumSizeValidator(control: AbstractControl): { [key: string]: any } {
      var size = String(control.value).length;
      if (size > 30) return { maximumSizeRestriction: "გთხოვთ შეიყვანოთ მაქსიმუმ 30 სიმბოლო" };
    }
  
    static spacesValidator(control: AbstractControl): {[key: string]: any } {
      if (String(control.value).indexOf(' ') >= 0) return { spacesRestriction: "გთხოვთ დაიცვათ შაბლონი 'სფეისების გარეშე'" }
    }

    static equalityValidation(control: FormGroup): { [key: string]: any } {
        var password = String(control.get("password").value);
        var repPassword = String(control.get("repPassword").value);
        
        if (password != repPassword) {
          return { equalityRestriction: "პაროლები არ ემთხვევა" }
        }
    }

    static minimalNumberValidation(control: AbstractControl): { [key: string]: any } {
        if (control.value == null || control.value <= 0) return { minimalNumberRestriction: "გთხოვთ შეიყვანოთ დადებითი რიცხვი" }
    }
  
}
