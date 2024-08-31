import { ReactElement, useState } from "react";
import classes from "./TripPlanner.module.css";
import { CreateTripForm } from "../CreateTripForm";
import { TripDayList } from "../TripDayList";
import { Button } from "../Button";
import { ExportPDF } from "../ExportPDF";
import { useTripContext } from "../../contexts/TripContext";
import { initialTrip } from "../../contexts/TripContext/TripContext";
import { useLocalStorageLoadTrip } from "../../hooks/useLocalStorageLoadTrip";
import { useLocalStorageSaveTrip } from "../../hooks/useLocalStorageSaveTrip";
import { TRIP_DATA_LOCAL_STORAGE_KEY } from "../../constants/localStorageConstants";
import { GiPalmTree, GiCommercialAirplane, GiSuitcase } from "react-icons/gi";
import cn from "classnames";
import { FaTrash } from "react-icons/fa";

export const TripPlanner = (): ReactElement => {
  const { tripData, setTripData } = useTripContext();

  useLocalStorageLoadTrip(TRIP_DATA_LOCAL_STORAGE_KEY, setTripData);
  useLocalStorageSaveTrip(TRIP_DATA_LOCAL_STORAGE_KEY, tripData);

  const resetData = () => {
    const verificationText: string =
      "Are you sure you want to delete your trip? This cannot be reverted.";
    if (window.confirm(verificationText)) {
      console.log("delete OK");
      setTripData(initialTrip);
      localStorage.removeItem(TRIP_DATA_LOCAL_STORAGE_KEY);
    }
  };

  const calculateDaysToDate = (): number => {
    console.log("date", tripData.startDate);
    const currentDate = new Date();
    const startDate = new Date(tripData.startDate);
    const differenceInTime = startDate.getTime() - currentDate.getTime();

    // Convert the time difference from milliseconds to days
    const differenceInDays = Math.ceil(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    return differenceInDays;
  };

  // TODO - split into smaller chunks
  return (
    <div className={classes.pageWrapper}>
      <div className={classes.header}>
        <div className={classes.headerWrapper}>
          <GiPalmTree className={classes.headerIcon} />
          <h1 className={classes.pageHeader}>Travel Planner</h1>
          <GiPalmTree
            className={cn(classes.headerIcon, classes.rightHeaderIcon)}
          />
        </div>
        {tripData.days.length === 0 ? (
          <div className={classes.formWrapper}>
            <CreateTripForm />
          </div>
        ) : (
          <>
            <div className={classes.subHeader}>
              <p className={classes.tripLength}>
                Your trip to "{tripData.destination}" is in{" "}
                {calculateDaysToDate()} days and will be {tripData.days.length}{" "}
                day
                {tripData.days.length === 1 ? "" : "s"} long
              </p>
              <GiCommercialAirplane className={classes.subHeaderIcon} />
              <GiSuitcase className={classes.subHeaderIcon} />
            </div>
            <div className={classes.actionButtons}>
              <ExportPDF />
              <Button onClick={resetData} variant="danger" icon={<FaTrash />}>
                Reset form
              </Button>
            </div>
          </>
        )}
      </div>
      {tripData && tripData.days.length > 0 && <TripDayList />}
    </div>
  );
};
