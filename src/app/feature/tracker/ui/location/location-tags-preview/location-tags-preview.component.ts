import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { AppLocation } from '../../../model';
import { LocationTagIconPipe } from '../location-tags/icon-tag.pipe';

@Component({
  selector: 'app-location-tags-preview',
  templateUrl: './location-tags-preview.component.html',
  styleUrls: ['./location-tags-preview.component.scss'],
  imports: [
    LocationTagIconPipe,
    TitleCasePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationTagsPreviewComponent {
  readonly tags = input.required<AppLocation['tags']>();
}
