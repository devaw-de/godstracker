import { Pipe, PipeTransform } from '@angular/core';
import { AppLocationTag } from '../../model';

@Pipe({
  name: 'tagIcon',
  pure: true
})
export class LocationTagPipe implements PipeTransform {
  transform(tag: AppLocationTag): string {
    switch (tag) {
      case AppLocationTag.COMBAT:
        return '⚔️';
      case AppLocationTag.DANGER:
        return '☠️';
      case AppLocationTag.TOTEM_LOCATION:
        return '🏆';
      case AppLocationTag.DO_NOT_VISIT:
        return '🚫';
      case AppLocationTag.RICH_REWARDS:
        return '💰';
      case AppLocationTag.TRADE_OPPORTUNITY:
        return '⚖️';
      default:
        return '??';
    }
  }
}
