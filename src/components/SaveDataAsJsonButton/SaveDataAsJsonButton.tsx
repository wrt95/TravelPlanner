import React, { type ReactElement } from "react";
import { Button } from "../Button";
import { useTripContext } from "../../contexts/TripContext";
import { FaDownload } from "react-icons/fa";
import { mapTripToTripDataWithoutAccordionInfo } from "../../utils/tripDataMappers";

export const SaveDataAsJsonButton = (): ReactElement => {
  const { tripData } = useTripContext();

  const saveAsJson = () => {
    const jsonString = JSON.stringify(
      mapTripToTripDataWithoutAccordionInfo(tripData),
      null,
      2
    );

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${tripData.destination}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={saveAsJson}
      icon={<FaDownload />}
      aria-label="Save trip as JSON file"
    >
      Save trip as JSON file
    </Button>
  );
};
