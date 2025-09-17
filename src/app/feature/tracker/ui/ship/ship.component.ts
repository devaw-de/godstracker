import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ShipRoom } from '../../model';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.scss',
  imports: [
    TitleCasePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipComponent {

  protected readonly locationOptions = Object.values(ShipRoom);

  readonly room = input.required<ShipRoom>();
  readonly location = input.required<number>();

  readonly roomChange = output<ShipRoom>();
  readonly locationChange = output<number>();

  protected updateLocation(location: number): void {
    this.locationChange.emit(location);
  }

  protected updateRoom(room: string): void {
    this.roomChange.emit(room as ShipRoom);
  }
}
