import { FaTimes } from "react-icons/fa";
import { Button } from "../../Button";
import classes from "./JsonFileError.module.css";
import { ReactElement } from "react";

type JsonFileErrorProps = {
  handleReset: () => void;
  fileName: string | null;
  errorMessage: string;
};

export const JsonFileError = ({
  handleReset,
  fileName,
  errorMessage,
}: JsonFileErrorProps): ReactElement => {
  return (
    <>
      <Button
        className={classes.resetButton}
        variant="danger"
        onClick={handleReset}
        icon={<FaTimes />}
      >
        Reset
      </Button>
      <p className={classes.error}>
        File "{fileName}" has an error: {errorMessage}
      </p>
    </>
  );
};
