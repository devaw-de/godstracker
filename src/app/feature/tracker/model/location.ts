export interface AppLocation {
  id: number;
  title: string;
  page: number;
  requires: number[];
  comments?: string[];
  done?: boolean;
}
