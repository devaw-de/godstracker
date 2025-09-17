import { Pipe, PipeTransform } from '@angular/core';
import { AppLocationTag } from '../../../model';

@Pipe({
  name: 'humanReadableTag',
})
export class LocationTagPipe implements PipeTransform {

  transform(tag: AppLocationTag): string {
    return tag
      .toString()
      .toLowerCase()
      .split('_')
      .map((part) => part[0].toUpperCase() + part.slice(1))
      .join(' ');
  }

}
