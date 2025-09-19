import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ShipRoom } from '../../../model';
import { EnumToStringPipe } from '../../../../../shared/pipes/enum-to-string.pipe';

@Component({
  selector: 'app-ship-room',
  templateUrl: './ship-room.component.html',
  styleUrl: './ship-room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EnumToStringPipe]
})
export class ShipRoomComponent {
  protected readonly locationOptions = Object.values(ShipRoom);

  readonly room = input.required();
  readonly roomChange = output<ShipRoom>();

  protected updateRoom(room: string): void {
    this.roomChange.emit(room as ShipRoom);
  }
}
