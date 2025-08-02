import { AppLocation } from '../model';

export const PAGES = [
  { pageNumber: 2, locationIds: [7, 30, 216, 186, 18, 34, 2, 174, 130] },
  { pageNumber: 3, locationIds: [63, 37, 43, 54, 20, 47, 3, 218] },
  { pageNumber: 4, locationIds: [126, 36, 16, 25, 75, 46, 98] },
  { pageNumber: 5, locationIds: [57, 50, 104, 90, 82, 195, 183, 176, 180] },
  { pageNumber: 6, locationIds: [108, 39, 8, 52, 101, 88, 116, 110, 123] },
  { pageNumber: 7, locationIds: [91, 31, 5, 28, 9, 207, 10, 66] },
  { pageNumber: 8, locationIds: [51, 32, 15, 4, 19, 217, 141, 111, 171] },
  { pageNumber: 9, locationIds: [44, 48, 35, 21, 150, 55, 45, 17] },
  { pageNumber: 10, locationIds: [11, 26, 209, 73, 62, 79, 96] },
  { pageNumber: 11, locationIds: [97, 49, 204, 190, 188, 177, 215, 196, 144] },
  { pageNumber: 12, locationIds: [70, 41, 103, 115, 12, 76, 87, 68, 92] },
  { pageNumber: 13, locationIds: [65, 6, 121, 59, 40, 22, 29, 102] },
  { pageNumber: 14, locationIds: [180, 114, 69, 42, 77, 107, 132, 78, 60, 42, 60, 58] },
  { pageNumber: 15, locationIds: [122, 23, 14, 86, 129, 13] },
  { pageNumber: 16, locationIds: [137, 24, 113, 128, 106, 83, 158, 146] },
  { pageNumber: 17, locationIds: [155, 149, 127, 165, 120, 201, 84, 64] },
  { pageNumber: 18, locationIds: [192, 156, 166, 172, 151, 181] },
  { pageNumber: 19, locationIds: [213, 206, 199, 160, 157] },
];

const namedLocations = new Map<number, string>([
  [160, 'Aurora Township'],
  [120, 'Lynn\'s Grove'],
  [180, 'Porthaven'],
  [60, 'Glance'],
  [40, 'City of Ashes'],
  [70, 'Lukra City'],
  [190, 'Alzaria'],
  [188, 'Zoo'],
  [177, 'South Gate'],
  [215, 'Alley Markets'],
  [196, 'Lower Docks'],
  [150, 'Pig Rips'],
  [40, 'Hunter\'s Haven'],
  [110, 'Crypts of Yval'],
  [50, 'Blood Rock'],
  [90, 'Eye of the Rock'],
  [130, 'Zikura Trading Post']
]);

/* Combined */
export const LOCATIONS: AppLocation[] = PAGES
  .map((page) => page.locationIds.map((id) => ({
      id: id,
      page: page.pageNumber
    }))
  )
  .flat()
  .sort((a, b) => a.id - b.id)
  .map((location) => ({
    id: location.id,
    title: namedLocations.get(location.id) ?? '',
    comments: [],
    requires: [],
    rewards: [],
    page: location.page
  }));
