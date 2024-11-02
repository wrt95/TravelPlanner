import { ChangeEvent, ReactElement, useRef, useState } from "react";
import { isValidTrip } from "../../utils/isValidTrip";
import { useTripContext } from "../../contexts/TripContext";
import { Trip } from "../../types/Trip";
import classes from "./UploadJsonDataButton.module.css"; // CSS Module for styling
import { Button } from "../Button";
import { FaUpload } from "react-icons/fa";
import { mapJsonToTripData } from "../../utils/tripDataMappers";
import { JsonFileUploader } from "./JsonFileUploader";
import { JsonFileError } from "./JsonFileError";

export const UploadJsonDataButton = (): ReactElement => {
  const { setTripData } = useTripContext();
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (isValidTrip(json)) {
          setError(null);
          const tripDataToSave: Trip = mapJsonToTripData(json);
          setTripData(tripDataToSave);
        } else {
          throw new Error("Invalid trip data format");
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
    setFileName(null);
  };

  return (
    <div className={classes.container}>
      <p className={classes.informationText}>
        You can also upload a JSON file with valid trip data to upload the trip
        in to the application.
      </p>
      <JsonFileUploader
        handleFileUpload={handleFileUpload}
        ref={fileInputRef}
      />
      <Button onClick={() => fileInputRef.current?.click()} icon={<FaUpload />}>
        Upload JSON
      </Button>
      {error && (
        <JsonFileError
          handleReset={handleReset}
          fileName={fileName}
          errorMessage={error}
        />
      )}
    </div>
  );
};
