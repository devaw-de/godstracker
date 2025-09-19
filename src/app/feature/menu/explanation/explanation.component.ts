import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GAME_URL, GITHUB_URL } from '../../../shared/model/sg-constants';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplanationComponent {
  protected readonly githubUrl = GITHUB_URL;
  protected readonly gameUrl = GAME_URL;
}
