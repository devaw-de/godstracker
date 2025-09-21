import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DialogRef } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AppItems, AppQuest } from '../../tracker/model';
import { easyModeStartingItems, normalModeStartingItems, tutorialReward } from './new-game.model';

interface NewGameParams {
  easyMode: boolean;
  termsAccepted: boolean;
  noTutorial: boolean;
}
interface NewGameForm {
  easyMode: FormControl<boolean>;
  termsAccepted: FormControl<boolean>;
  noTutorial: FormControl<boolean>;
}

@Component({
  selector: 'app-new-game-modal',
  templateUrl: './new-game-modal.component.html',
  styleUrl: './new-game-modal.component.scss',
  imports: [
    ReactiveFormsModule,
    FaIconComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameModalComponent {
  readonly #dialogRef = inject(DialogRef);

  protected readonly icons = {
    warning: faExclamationTriangle,
  };
  protected readonly form = new FormGroup<NewGameForm>({
    easyMode: new FormControl<boolean>(false, {nonNullable: true}),
    termsAccepted: new FormControl<boolean>(false, {nonNullable: true}),
    noTutorial: new FormControl<boolean>(false, {nonNullable: true})
  });

  readonly formValue = toSignal<Partial<NewGameParams>>(this.form.valueChanges);
  readonly startingItems = computed<Partial<AppItems>>(() => this.formValue()?.easyMode
    ? easyModeStartingItems
    : normalModeStartingItems
  );
  readonly items = computed<Partial<AppItems>>(() => this.formValue()?.noTutorial
    ? {
      ...this.startingItems(),
      coins: (this.startingItems()?.coins ?? 0) + tutorialReward.items.coins,
      grain: (this.startingItems()?.grain ?? 0) + tutorialReward.items.grain,
    }
    : this.startingItems()
  );
  readonly iterableItems = computed(() => [...Object.entries(this.items())]
    .filter(([_, value]) => !!value)
  );
  readonly quests = computed<AppQuest[]>(() => this.formValue()?.noTutorial
    ? tutorialReward.quests
    : []
  );

  protected start(): void {
    if (!this.formValue()?.termsAccepted) {
      return;
    }
    this.#dialogRef.close({
      items: this.items(),
      quests: this.quests()
    });
  }
}
