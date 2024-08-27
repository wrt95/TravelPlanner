import { ReactElement, ChangeEvent } from "react";
// import classes from "./ActivityRow.module.css";
import { TripActivity, TripActivityTextField } from "../../../types/Trip";
import { Button } from "../../Button";
import { TextArea } from "../../TextArea";
import { FaTrash } from "react-icons/fa";
// import { useTripContext } from "../../../contexts/TripContext";

type ActivityRowProps = {
  activity: TripActivity;
  onChange: (field: TripActivityTextField, value: string) => void;
  onRemove: () => void;
};

export const ActivityRow = ({
  activity,
  onChange,
  onRemove,
}: ActivityRowProps): ReactElement => {
  const handleChangeActivity = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange("activity", e.target.value);
  };
  const handleChangeImportant = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange("importantInformation", e.target.value);
  };
  const handleChangeOther = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange("otherInformation", e.target.value);
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
        <TextArea
          value={activity.otherInformation ?? ""}
          onChange={handleChangeOther}
          label="Other Information"
          hideLabel
        />
      </td>
      <td>
        <Button
          onClick={onRemove}
          variant="danger"
          aria-label="Delete activity"
          icon={<FaTrash />}
          // TODO - ADD DISABLED
        />
      </td>
    </tr>
  );
};
