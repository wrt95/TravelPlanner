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
import { FaEdit, FaTrash } from "react-icons/fa";
import { EditTripDetails } from "../EditTripDetails";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { MEDIA_QUERY_MAX_WIDTH } from "../../constants/mediaQueryConstants";
import { SaveDataAsJsonButton } from "../SaveDataAsJsonButton";
import { calculateDaysToDate } from "../../utils/calculateDaysToDate";

export const TripPlanner = (): ReactElement => {
  const { tripData, setTripData } = useTripContext();
  const isSmallScreen = useMediaQuery(MEDIA_QUERY_MAX_WIDTH);

  useLocalStorageLoadTrip(TRIP_DATA_LOCAL_STORAGE_KEY, setTripData);
  useLocalStorageSaveTrip(TRIP_DATA_LOCAL_STORAGE_KEY, tripData);

  const [editMode, setEditoMode] = useState<boolean>(false);

  const resetData = () => {
    const verificationText: string =
      "Are you sure you want to delete your trip? This cannot be reverted.";
    if (window.confirm(verificationText)) {
      console.log("delete OK");
      setTripData(initialTrip);
      localStorage.removeItem(TRIP_DATA_LOCAL_STORAGE_KEY);
    }
  };

  const handleClickEdit = () => {
    setEditoMode(true);
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
        ) : editMode ? (
          <EditTripDetails onSave={() => setEditoMode(false)} />
        ) : (
          <>
            <div className={classes.subHeader}>
              <p className={classes.tripLength}>
                Your trip to "{tripData.destination}" is in{" "}
                {calculateDaysToDate(tripData)} day
                {calculateDaysToDate(tripData) === 1 ? "" : "s"} and will be{" "}
                {tripData.days.length} day
                {tripData.days.length === 1 ? "" : "s"}
                <GiCommercialAirplane className={classes.subHeaderIcon} />
                <GiSuitcase className={classes.subHeaderIcon} />
              </p>
            </div>
            <div
              className={
                isSmallScreen
                  ? classes.actionButtonsSmall
                  : classes.actionButtons
              }
            >
              <ExportPDF />
              <Button
                onClick={handleClickEdit}
                icon={<FaEdit />}
                aria-label="Edit destination and start date"
              >
                Edit destination and start date
              </Button>
              <Button
                onClick={resetData}
                variant="danger"
                icon={<FaTrash />}
                aria-label="Reset form"
              >
                Reset form
              </Button>
              <SaveDataAsJsonButton />
            </div>
          </>
        )}
      </div>
      {tripData && tripData.days.length > 0 && <TripDayList />}
    </div>
  );
};
