import classes from "./JsonFileUploader.module.css";
import { ChangeEvent, forwardRef, ReactElement } from "react";

type JsonFileUploaderProps = {
  handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const JsonFileUploader = forwardRef<
  HTMLInputElement,
  JsonFileUploaderProps
>(({ handleFileUpload }, ref): ReactElement => {
  return (
    <>
      <label className={classes.srOnlyLabel} id="fileInput">
        Upload a JSON file with trip data
      </label>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        ref={ref}
        className={classes.fileInput}
        aria-labelledby="fileInput"
      />
    </>
  );
});

JsonFileUploader.displayName = "JsonFileUploader";
