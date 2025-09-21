import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ShipRoom } from '../../../model';
import { EnumToStringPipe } from '../../../../../shared/pipes/enum-to-string.pipe';

@Component({
  selector: 'app-ship-damage',
  templateUrl: './ship-damage.component.html',
  styleUrls: ['./ship-damage.component.scss'],
  imports: [
    NgTemplateOutlet,
    EnumToStringPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipDamageComponent {
  protected readonly ShipRoom = ShipRoom;
  protected readonly shipRooms = Object.values(ShipRoom);
  protected readonly shipRoomsWithoutNone = this.shipRooms.filter((room) => room !== ShipRoom.NONE);

  readonly damage = input.required<Record<ShipRoom, number>>();
  readonly noDamage = computed(() => this.shipRooms.every((room) => !this.damage()[room]));
  readonly damageChange = output<{ room: ShipRoom, value: number}>();
  readonly repairAll = output<void>()

  protected increaseDamage(room: ShipRoom, damage: number): void {
    this.damageChange.emit({
      room: room,
      value: this.damage()[room] + damage
    });
  }
}
