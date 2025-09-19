import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AppLocation } from '../../../model';
import { LocationTagIconPipe } from '../location-tags/icon-tag.pipe';
import { EnumToStringPipe } from '../../../../../shared/pipes/enum-to-string.pipe';

@Component({
  selector: 'app-location-tags-preview',
  templateUrl: './location-tags-preview.component.html',
  styleUrls: ['./location-tags-preview.component.scss'],
  imports: [
    LocationTagIconPipe,
    EnumToStringPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationTagsPreviewComponent {
  readonly tags = input.required<AppLocation['tags']>();
}
