import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Ship } from '../../../model';

@Component({
  selector: 'app-ship-location',
  templateUrl: './ship-location.component.html',
  styleUrl: './ship-location.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShipLocationComponent {
  readonly location = input.required<Ship['location']>();
  readonly locationChange = output<Ship['location']>();

  protected updateLocation(location: number): void {
    this.locationChange.emit(location);
  }
}
