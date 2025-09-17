export enum AppLocationTag {
  DANGER = 'DANGER',
  COMBAT = 'COMBAT',
  DO_NOT_VISIT = 'DO_NOT_VISIT',
  TOTEM_LOCATION = 'TOTEM_LOCATION',
  RICH_REWARDS = 'RICH_REWARDS',
  TRADE_OPPORTUNITY = 'TRADE_OPPORTUNITY',
}

export interface AppLocation {
  id: number;
  title: string;
  page: number;
  requires: number[];
  rewards: number[];
  comments?: string[];
  done?: boolean;
  tags?: AppLocationTag[];
  // TODO: filter out quest cards you already have
  // TODO: button in menu "start a new game"  / with easy mode
}
