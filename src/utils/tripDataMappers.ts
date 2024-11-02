import {
  Trip,
  TripActivity,
  TripDay,
  TripWithoutAccordion,
} from "../types/Trip";

export const mapJsonToTripData = (json: Trip): Trip => {
  return {
    destination: json.destination,
    days: mapJsonDaysToTripDays(json.days),
    startDate: json.startDate,
  };
};

const mapJsonDaysToTripDays = (jsonTripDays: TripDay[]): TripDay[] => {
  return jsonTripDays.map((jsonTripDay: TripDay) =>
    mapJsonDayToTripDay(jsonTripDay)
  );
};

const mapJsonDayToTripDay = (jsonTripDay: TripDay): TripDay => {
  return {
    day: jsonTripDay.day,
    isAccordionOpen: false,
    activities: mapJsonActivitiesToTripActivities(jsonTripDay.activities),
  };
};

const mapJsonActivitiesToTripActivities = (
  jsonTripActivities: TripActivity[]
): TripActivity[] => {
  return jsonTripActivities.map((jsonTripActivity: TripActivity) =>
    mapJsonTripActivityToTripActivity(jsonTripActivity)
  );
};

const mapJsonTripActivityToTripActivity = (
  jsonTripActivity: TripActivity
): TripActivity => {
  return {
    activity: jsonTripActivity.activity,
    importantInformation: jsonTripActivity.importantInformation,
  };
};

export const mapTripToTripDataWithoutAccordionInfo = (
  trip: Trip
): TripWithoutAccordion => {
  return {
    destination: trip.destination,
    startDate: trip.startDate,
    days: trip.days.map(({ day, activities }) => ({
      day,
      activities,
    })),
  };
};
