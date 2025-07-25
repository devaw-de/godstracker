import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-debug',
  template: 'DEBUG',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent {

  constructor() {
    console.warn('WTF')
  }

}
