export type TripActivity = {
  activity: string;
  importantInformation: string;
};

export type TripDay = {
  day: number;
  activities: TripActivity[];
  isAccordionOpen: boolean;
};

export type Trip = {
  destination: string;
  startDate: string;
  days: TripDay[];
};

export type TripActivityTextField = "activity" | "importantInformation";

export type TripDayWithoutAccordion = Omit<TripDay, "isAccordionOpen">;

export type TripWithoutAccordion = {
  destination: string;
  startDate: string;
  days: TripDayWithoutAccordion[];
};
