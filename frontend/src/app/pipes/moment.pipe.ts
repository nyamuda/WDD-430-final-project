import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  transform(value: string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
    let localTime = moment(value).local().format(format);
    return moment(localTime).fromNow();
  }
}
