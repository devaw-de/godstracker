import { AppItems } from '../../tracker/model';

export const normalModeStartingItems: Partial<AppItems> = {
  xp: 0,
  coins: 0,
  grain: 0,
  meat: 0,
  vegetables: 0
};
export const easyModeStartingItems: Partial<AppItems> = {
  xp: 20,
  coins: 20,
  grain: 1,
  meat: 1,
  vegetables: 1,
};
export const tutorialReward = {
  items: {
    coins: 3,
    grain: 1,
  },
  quests: [
    {id: 1, name: 'raid'},
    { id: 2, name: 'cottage' }
  ],
  adventureCards: [
    'Gloria',
    'Soup',
    'Gear',
    'Flapjacks',
  ]
};
