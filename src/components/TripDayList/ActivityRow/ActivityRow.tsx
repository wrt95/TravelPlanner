import { ReactElement, ChangeEvent } from "react";
import { TripActivity, TripActivityTextField } from "../../../types/Trip";
import { Button } from "../../Button";
import { TextArea } from "../../TextArea";
import { FaTrash } from "react-icons/fa";

type ActivityRowProps = {
  activity: TripActivity;
  onChange: (field: TripActivityTextField, value: string) => void;
  onRemove: () => void;
  disableDeleteButton: boolean;
  activityIndex: number;
  dayIndex: number;
};

export const ActivityRow = ({
  activity,
  onChange,
  onRemove,
  disableDeleteButton,
  activityIndex,
  dayIndex,
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
          id={`Activity index: ${activityIndex} for day index ${dayIndex}`}
        />
      </td>
      <td>
        <TextArea
          value={activity.importantInformation}
          onChange={handleChangeImportant}
          label="Important Information"
          hideLabel
          id={`Information index: ${activityIndex} for day index ${dayIndex}`}
        />
      </td>
      <td>
        <Button
          onClick={onRemove}
          variant="danger"
          aria-label="Delete activity"
          icon={<FaTrash />}
          disabled={disableDeleteButton}
        />
      </td>
    </tr>
  );
};
