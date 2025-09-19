import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ShipRoom } from '../../../model';

@Component({
  selector: 'app-ship-room',
  templateUrl: './ship-room.component.html',
  styleUrl: './ship-room.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TitleCasePipe]
})
export class ShipRoomComponent {
  protected readonly locationOptions = Object.values(ShipRoom);

  readonly room = input.required();
  readonly roomChange = output<ShipRoom>();

  protected updateRoom(room: string): void {
    this.roomChange.emit(room as ShipRoom);
  }
}
