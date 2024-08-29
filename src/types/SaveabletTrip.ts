export type SaveableTrip = {
  destination: string;
  days: SaveableTripDay[];
};

export type SaveableTripDay = {
  day: number;
  activities: SaveableTripActivity[];
  isAccordionOpen: boolean;
};

export type SaveableTripActivity = {
  activity: string;
  importantInformation?: string;
};
