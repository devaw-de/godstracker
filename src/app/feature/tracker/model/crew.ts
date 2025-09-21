export enum CrewNames {
  AUDREY = 'AUDREY',
  CAPTAIN = 'CAPTAIN',
  GREGORY = 'GREGORY',
  KANAAN = 'KANAAN',
  KASUMI = 'KASUMI',
  LAURENT = 'LAURENT',
  MAC = 'MAC',
  MARCO = 'MARCO',
  RAFFAEL = 'RAFFAEL'
}

export const crewHealth: Record<CrewNames, number> = {
  [CrewNames.AUDREY]: 5,
  [CrewNames.CAPTAIN]: 5,
  [CrewNames.GREGORY]: 6,
  [CrewNames.KANAAN]: 5,
  [CrewNames.KASUMI]: 5,
  [CrewNames.LAURENT]: 5,
  [CrewNames.MAC]: 5,
  [CrewNames.MARCO]: 5,
  [CrewNames.RAFFAEL]: 7
}

export interface Crew {
  name: CrewNames;
  playerIndex: number;
  fatigue: number;
  commandTokens: number[];
  equipment: string[];
  xpCards: string[];
  abilityCards: string[];
  injuries: number;
  maxHealth: number;
  injuriesHearts?: boolean[],
  comment: string;
}
