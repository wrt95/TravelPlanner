import { Trip, TripActivity, TripDay } from "../types/Trip";

export const isValidTrip = (data: unknown): data is Trip => {
  if (typeof data !== "object" || data === null) return false;

  const trip = data as Trip;
  return (
    typeof trip.destination === "string" &&
    typeof trip.startDate === "string" &&
    Array.isArray(trip.days) &&
    trip.days.every(
      (day: unknown) =>
        typeof day === "object" &&
        day !== null &&
        typeof (day as TripDay).day === "number" &&
        Array.isArray((day as TripDay).activities) &&
        (day as TripDay).activities.every(
          (activity: unknown) =>
            typeof activity === "object" &&
            activity !== null &&
            typeof (activity as TripActivity).activity === "string" &&
            typeof (activity as TripActivity).importantInformation === "string"
        )
    )
  );
};
