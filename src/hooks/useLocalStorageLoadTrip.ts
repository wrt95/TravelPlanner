import { useEffect } from "react";
import { Trip } from "../types/Trip";

export const useLocalStorageLoadTrip = (
  key: string,
  setTripData: (value: Trip) => void
) => {
  useEffect(() => {
    const loadData = () => {
      const savedData = localStorage.getItem(key);
      if (savedData) {
        const tripData = JSON.parse(savedData) as Trip;
        setTripData(tripData);
      }
    };
    loadData();
  }, [key, setTripData]);
};
