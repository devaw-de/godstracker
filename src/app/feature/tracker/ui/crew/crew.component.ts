import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { TextInputModalComponent } from '../../../../shared/components';
import { Crew, CrewNames } from '../../model';
import { CrewInjuriesComponent } from './crew-injuries/crew-injuries.component';
import { CrewCommentComponent } from './crew-comment/crew-comment.component';
import { CrewItems } from './crew-items/crew-items.component';
import { CrewCommandTokensComponent } from './crew-command-tokens/crew-command-tokens.component';
import { CrewPlayerSelectionComponent } from './crew-player-selection/crew-player-selection.component';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.scss',
  imports: [
    TitleCasePipe,
    CrewInjuriesComponent,
    CrewCommentComponent,
    CrewItems,
    CrewCommandTokensComponent,
    CrewPlayerSelectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrewComponent {

  readonly #dialog = inject(Dialog);

  protected  readonly CrewNames = CrewNames;

  readonly players = input.required<string[]>();
  readonly crew = input.required<Crew[]>();

  readonly crewMates = computed(() => this.crew().map((mate) => ({
    ...mate,
    injuriesHearts: Array
      .from({ length: mate.maxHealth })
      .map((_, index) => index >= mate.injuries)
  })));

  crewChange = output<Crew[]>();

  protected updateControllingPlayer(crewMate: Crew, ownerIndex: string): void {
    this.crewChange.emit([
      ...this.crew().filter((mate) => mate.name !== crewMate.name),
      {
        ...crewMate,
        playerIndex: Number.parseInt(ownerIndex)
      }
    ]);
  }

  protected incrementCommandToken(mate: Crew, index: number, value: 1 | -1): void {
    const tokens = [...mate.commandTokens];
    tokens[index] += value;
    this.crewChange.emit([
      ...this.crew().filter((c) => c.name !== mate.name),
      {
        ...mate,
        commandTokens: tokens
      }
    ])
  }

  protected incrementInjuries(mate: Crew, value: 1 | -1): void {
    this.crewChange.emit([
      ...this.crew().filter((c) => c.name !== mate.name),
      {
        ...mate,
        injuries: mate.injuries + value
      }
    ]);
  }

  protected addAbilityCard(mate: Crew): void {
    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        heading: 'Enter ability card name',
        label: 'Card name'
      }
    });
    dialog.closed.subscribe((result) => {
      if (result) {
        this.#addAbilityCard(mate, result);
      }
    });
  }

  protected addXpCard(mate: Crew): void {
    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        heading: 'Enter ability card name',
        label: 'Card name'
      }
    });
    dialog.closed.subscribe((result) => {
      if (result) {
        this.#addXpCard(mate, result);
      }
    });
  }

  protected removeXpCard(mate: Crew, index: number): void {
    const card = mate.xpCards.at(index);
    this.crewChange.emit([
      ...this.crew().filter((c) => c.name !== mate.name),
      {
        ...mate,
        xpCards: mate.xpCards.filter((c) => c !== card)
      }
    ])
  }

  protected removeAbilityCard(mate: Crew, index: number): void {
    const card = mate.abilityCards.at(index);
    this.crewChange.emit([
      ...this.crew().filter(c => c.name !== mate.name),
      {
        ...mate,
        abilityCards: mate.abilityCards.filter((c) => c !== card)
      }
    ])
  }

  protected removeEquipment(mate: Crew, index: number): void {
    const item = mate.equipment.at(index);
    this.crewChange.emit([
      ...this.crew().filter(c => c.name !== mate.name),
      {
        ...mate,
        equipment: mate.equipment.filter((e) => e !== item)
      }
    ]);
  }

  protected addEquipment(mate: Crew): void {
    const dialog = this.#dialog.open<string>(TextInputModalComponent, {
      data: {
        heading: 'Enter equipment card name',
        label: 'Card name'
      }
    });
    dialog.closed.subscribe((result) => {
      if (result) {
        this.#addEquipment(mate, result);
      }
    })
  }

  protected updateComment(mate: Crew, text: string): void {
    this.crewChange.emit([
      ...this.#getCrewExcept(mate),
      {
        ...mate,
        comment: text,
      }
    ]);
  }

  #addXpCard(mate: Crew, card: string): void {
    this.crewChange.emit([
      ...this.crew().filter(c => c.name !== mate.name),
      {
        ...mate,
        xpCards: [...mate.xpCards, card]
      }
    ]);
  }

  #addAbilityCard(mate: Crew, card: string): void {
    this.crewChange.emit([
      ...this.crew().filter(c => c.name !== mate.name),
      {
        ...mate,
        abilityCards: [...mate.abilityCards, card]
      }
    ]);
  }

  #addEquipment(mate: Crew, item: string): void {
    this.crewChange.emit([
      ...this.crew().filter(c => c.name !== mate.name),
      {
        ...mate,
        equipment: [...mate.equipment, item]
      }
    ]);
  }

  #getCrewExcept(mate: Crew): Crew[] {
    return this.crew().filter((c) => c.name !== mate.name);
  }

}
