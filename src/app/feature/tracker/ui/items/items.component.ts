import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import {
  faAnkh,
  faBacon,
  faCarrot,
  faCoins,
  faCubesStacked,
  faExplosion,
  faWheatAwn
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AppItems } from '../../model';
import { NumberUtils } from '../../../../shared/utilities/number.utils';
import { EnumToStringPipe } from '../../../../shared/pipes/enum-to-string.pipe';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  imports: [
    EnumToStringPipe,
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {
  protected readonly maxItemCount = 99;
  protected readonly itemTypes: (keyof AppItems)[] = [
    'xp',
    'coins',
    'artefacts',
    'grain',
    'meat',
    'vegetables',
    'materials'
  ];
  protected readonly icons = {
    xp: faExplosion,
    grain: faWheatAwn,
    coins: faCoins,
    artefacts: faAnkh,
    meat: faBacon,
    vegetables: faCarrot,
    materials: faCubesStacked
  };
  readonly items = input.required<AppItems>();
  readonly itemsChanged = output<AppItems>();

  protected increment(item: keyof AppItems, value: number): void {
    this.itemsChanged.emit({
      ...this.items(),
      [item]: NumberUtils.clamp(
        this.items()[item] + value,
        { min: 0, max: this.maxItemCount }
      )
    });
  }

  protected reset(item: keyof AppItems): void {
    this.itemsChanged.emit({
      ...this.items(),
      [item]: 0
    });
  }
}
