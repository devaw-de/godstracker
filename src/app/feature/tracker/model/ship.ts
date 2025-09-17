export enum ShipRoom {
  NONE = 'NONE',
  DECK = 'DECK',
  BRIDGE = 'BRIDGE',
  GALLEY = 'GALLEY',
  QUARTERS = 'QUARTERS',
  SICK_BAY = 'SICK_BAY'
}

export interface Ship {
  location: number;
  room: ShipRoom;
}
