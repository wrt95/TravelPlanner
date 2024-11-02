import { Trip } from "../types/Trip";

export const calculateDaysToDate = (tripData: Trip): number => {
  const currentDate = new Date();
  const startDate = new Date(tripData.startDate);
  const differenceInTime = startDate.getTime() - currentDate.getTime();

  // Convert the time difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
};
