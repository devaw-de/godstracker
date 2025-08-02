export interface AppLocation {
  id: number;
  title: string;
  page: number;
  requires: number[];
  rewards: number[];
  comments?: string[];
  done?: boolean;
}
