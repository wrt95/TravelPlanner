import { FormEvent, ReactElement } from "react";
import classes from "./CreateTripForm.module.css";
import { Textfield } from "../Textfield";
import { Button } from "../Button";
import { useTripContext } from "../../contexts/TripContext";
import { Trip, TripDay } from "../../types/Trip";
import { FaPlus } from "react-icons/fa";

type CreateTripFormData = {
  destination: string;
  days: number;
  startDate: Date;
};

export const CreateTripForm = (): ReactElement => {
  const { setTripData } = useTripContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData(e.currentTarget);
    const createTripForm: CreateTripFormData = {
      destination: formData.get("destination") as string,
      days: Number(formData.get("days") as string),
      startDate: new Date(formData.get("startDate") as string),
    };
    const { destination, days, startDate } = createTripForm;

    const newTripData: TripDay[] = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      activities: [{ activity: "", importantInformation: "" }],
      isAccordionOpen: true,
    }));
    const newTrip: Trip = {
      destination,
      days: newTripData,
      startDate,
    };
    setTripData(newTrip);
  };

  return (
    <>
      <p className={classes.pageDescription}>
        To plan your trip, you must first select the number of days you will be
        traveling for.
      </p>
      <p className={classes.pageDescription}>
        You will be able to add and remove days later on as well.
      </p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Textfield
          type="text"
          name="destination"
          required
          label="Where are you going?"
          id="Destination"
        />
        <Textfield
          type="number"
          name="days"
          required
          label="Number of days of your trip"
          min={1}
          id="Number of days"
        />
        <Textfield
          type="date"
          name="startDate"
          required
          label="Start date of trip"
          id="StartDate"
        />
        <Button className={classes.button} type="submit" icon={<FaPlus />}>
          Create Plan
        </Button>
      </form>
    </>
  );
};
