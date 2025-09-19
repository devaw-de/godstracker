import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ShipRoom } from '../../../model';
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-ship-damage',
  templateUrl: './ship-damage.component.html',
  styleUrls: ['./ship-damage.component.scss'],
  imports: [
    TitleCasePipe,
    NgTemplateOutlet
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipDamageComponent {
  protected readonly ShipRoom = ShipRoom;
  protected readonly shipRooms = Object.values(ShipRoom);
  protected readonly shipRoomsWithoutNone = this.shipRooms.filter((room) => room !== ShipRoom.NONE);

  readonly damage = input.required<Record<ShipRoom, number>>();
  readonly damageChange = output<{ room: ShipRoom, value: number}>();

  protected increaseDamage(room: ShipRoom, damage: number): void {
    this.damageChange.emit({
      room: room,
      value: this.damage()[room] + damage
    });
  }
}
