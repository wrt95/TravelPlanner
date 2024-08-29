import { ReactElement, ChangeEvent } from "react";
import classes from "./ActivityRow.module.css";
import { TripActivity, TripActivityTextField } from "../../../types/Trip";
import { Button } from "../../Button";
import { TextArea } from "../../TextArea";
import { FaTrash } from "react-icons/fa";
// import { useTripContext } from "../../../contexts/TripContext";

type ActivityRowProps = {
  activity: TripActivity;
  onChange: (field: TripActivityTextField, value: string) => void;
  onRemove: () => void;
  disableDeleteButton: boolean;
};

export const ActivityRow = ({
  activity,
  onChange,
  onRemove,
  disableDeleteButton,
}: ActivityRowProps): ReactElement => {
  const handleChangeActivity = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange("activity", e.target.value);
  };

  const handleChangeImportant = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange("importantInformation", e.target.value);
  };

  return (
    <tr>
      <td>
        <TextArea
          value={activity.activity}
          onChange={handleChangeActivity}
          required
          label="Activity"
          hideLabel
        />
      </td>
      <td>
        <TextArea
          value={activity.importantInformation ?? ""}
          onChange={handleChangeImportant}
          label="Important Information"
          hideLabel
        />
      </td>
      <td>
        <Button
          onClick={onRemove}
          variant="danger"
          aria-label="Delete activity"
          icon={<FaTrash />}
          disabled={disableDeleteButton}

          // TODO - ADD DISABLED
        />
      </td>
    </tr>
  );
};
