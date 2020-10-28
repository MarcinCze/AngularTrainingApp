import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    var hours: number = Math.floor(value / 60);
    var minutes: number = value - (hours * 60);
    return `${hours}h ${minutes}min`
  }

}
