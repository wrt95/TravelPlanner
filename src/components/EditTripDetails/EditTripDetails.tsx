import { ChangeEvent, ReactElement, useState } from "react";
import classes from "./EditTripDetails.module.css";
import { useTripContext } from "../../contexts/TripContext";
import { Textfield } from "../Textfield";
import { Button } from "../Button";
import { FaSave } from "react-icons/fa";
import { Trip } from "../../types/Trip";

type EditTripDetailsProps = {
  onSave: () => void;
};

export const EditTripDetails = ({
  onSave,
}: EditTripDetailsProps): ReactElement => {
  const { tripData, setTripData } = useTripContext();

  const [destination, setDestination] = useState(tripData.destination);
  const [startDate, setStartDate] = useState(tripData.startDate);

  const handleSubmit = () => {
    const updatedTripData: Trip = {
      ...tripData,
      destination,
      startDate,
    };
    setTripData(updatedTripData);
    onSave();
  };

  const handleChangeDestination = (e: ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <Textfield
          type="text"
          name="destination"
          required
          label="Where are you going?"
          id="Destination"
          value={destination}
          onChange={handleChangeDestination}
        />
        <Textfield
          type="date"
          name="startDate"
          required
          label="Start date of trip"
          id="StartDate"
          value={startDate}
          onChange={handleChangeStartDate}
        />
      </div>
      <div>
        <Button
          className={classes.button}
          onClick={handleSubmit}
          icon={<FaSave />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
