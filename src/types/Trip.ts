export type TripActivity = {
  // id: number;
  activity: string;
  importantInformation?: string;
};

export type TripDay = {
  //id: number;
  day: number;
  activities: TripActivity[];
  isAccordionOpen: boolean;
};

export type Trip = {
  destination: string;
  days: TripDay[];
  // TODO price
};

export type TripActivityTextField = "activity" | "importantInformation";
