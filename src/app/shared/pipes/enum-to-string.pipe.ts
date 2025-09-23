import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString',
  pure: true,
})
export class EnumToStringPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .toString()
      .split('_')
      .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }
}
