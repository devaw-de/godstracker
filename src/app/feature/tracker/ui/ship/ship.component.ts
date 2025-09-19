import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ShipRoom } from '../../model';
import { ShipDamageComponent } from './damage/ship-damage.component';
import { ShipRoomComponent } from './room/ship-room.component';
import { ShipLocationComponent } from './location/ship-location.component';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.scss',
  imports: [
    ShipDamageComponent,
    ShipRoomComponent,
    ShipLocationComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipComponent {
  readonly room = input.required<ShipRoom>();
  readonly location = input.required<number>();
  readonly damage = input.required<Record<ShipRoom, number>>();

  readonly roomChange = output<ShipRoom>();
  readonly locationChange = output<number>();
  readonly damageChange = output<{ room: ShipRoom, value: number }>();
}
