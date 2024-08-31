import { useEffect } from "react";
import { Trip } from "../types/Trip";

export const useLocalStorageSaveTrip = (key: string, trip: Trip) => {
  useEffect(() => {
    const saveData = async () => {
      localStorage.setItem(key, JSON.stringify(trip));
    };
    saveData();
  }, [key, trip]);
};
