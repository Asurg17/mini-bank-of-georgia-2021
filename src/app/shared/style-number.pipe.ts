import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "styleNumber"
})
export class StyleNumberPipe implements PipeTransform{
    transform(value) {
        return value + '.00'
    }
}