export interface AppQuest {
  id: number;
  name: string;
}

export interface AppQuestWithAvailability {
  id: number;
  name: string | undefined;
  available: boolean | undefined;
}
