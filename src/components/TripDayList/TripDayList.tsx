import { ReactElement } from "react";
import classes from "./TripDayList.module.css";
import { TripActivityTextField, TripDay } from "../../types/Trip";
import { TripDayTable } from "./TripDayTable";
import { Button } from "../Button";
import { useTripContext } from "../../contexts/TripContext";
import { FaPlus } from "react-icons/fa";

export const TripDayList = (): ReactElement => {
  const { tripData, setTripData } = useTripContext();

  const handleAddRow = (dayIndex: number) => {
    const newTripDays: TripDay[] = [...tripData.days];
    newTripDays[dayIndex].activities.push({
      activity: "",
      importantInformation: "",
    });
    setTripData({ ...tripData, days: newTripDays });
  };

  const handleActivityChange = (
    dayIndex: number,
    activityIndex: number,
    field: TripActivityTextField,
    value: string
  ) => {
    const newTripDays = [...tripData.days];
    newTripDays[dayIndex].activities[activityIndex][field] = value as string;

    setTripData({ ...tripData, days: newTripDays });
  };

  const handleRemoveRow = (dayIndex: number, activityIndex: number) => {
    const newTripDays: TripDay[] = [...tripData.days];
    newTripDays[dayIndex].activities.splice(activityIndex, 1);

    const confirmText: string =
      "Are you sure you want to delete this activity? This action cannot be reverted.";
    if (window.confirm(confirmText)) {
      setTripData({ ...tripData, days: newTripDays });
    }
  };

  const handleDeleteDay = (dayIndex: number) => {
    const newTripDays: TripDay[] = [...tripData.days];
    newTripDays.splice(dayIndex, 1);

    const dataMappedWithNewDays = newTripDays.map(
      (data: TripDay, index: number) => ({
        ...data,
        day: index + 1,
      })
    );
    const confirmText: string =
      "Are you sure you want to delete the day? This action cannot be reverted.";
    if (window.confirm(confirmText)) {
      setTripData({ ...tripData, days: dataMappedWithNewDays });
    }
  };

  // TODO - FIX SO THAT NEW ELEMENT IS NOT SAME AS OLD
  const handleAddDay = () => {
    const newTripDay: TripDay = {
      day: tripData.days.length + 1,
      activities: [
        {
          activity: "",
          importantInformation: "",
        },
      ],
      isAccordionOpen: true,
    };
    const updatedTripDays: TripDay[] = [...tripData.days, newTripDay];
    setTripData({ ...tripData, days: updatedTripDays });
  };

  const handleSetAccordionOpen = (isOpen: boolean, dayIndex: number) => {
    const newTripDays = [...tripData.days];
    newTripDays[dayIndex].isAccordionOpen = isOpen;

    setTripData({ ...tripData, days: newTripDays });
  };

  return (
    <div className={classes.wrapper}>
      {tripData.days.map((tripDay: TripDay, dayIndex: number) => (
        <TripDayTable
          key={tripDay.day}
          day={tripDay.day}
          activities={tripDay.activities}
          onAddActivity={() => handleAddRow(dayIndex)}
          onActivityChange={(activityIndex, field, value) =>
            handleActivityChange(dayIndex, activityIndex, field, value)
          }
          onRemoveActivity={(activityIndex: number) =>
            handleRemoveRow(dayIndex, activityIndex)
          }
          onDeleteDay={() => handleDeleteDay(dayIndex)}
          isAccordionOpen={tripDay.isAccordionOpen}
          setAccordionOpen={(isOpen: boolean) =>
            handleSetAccordionOpen(isOpen, dayIndex)
          }
        />
      ))}
      <Button onClick={handleAddDay} icon={<FaPlus />}>
        Add Another Day
      </Button>
    </div>
  );
};
