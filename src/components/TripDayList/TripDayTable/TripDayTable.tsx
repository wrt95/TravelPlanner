import { ReactElement } from "react";
import classes from "./TripDayTable.module.css";
import { ActivityRow } from "../ActivityRow";
import { TripActivity, TripActivityTextField } from "../../../types/Trip";
import { Button } from "../../Button";
import {
  FaArrowDown,
  FaArrowUp,
  FaInfoCircle,
  FaPlus,
  FaTasks,
  FaTrash,
} from "react-icons/fa";
import cn from "classnames";
import { useTripContext } from "../../../contexts/TripContext";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { MEDIA_QUERY_MAX_WIDTH } from "../../../constants/mediaQueryConstants";

type TripDayTableProps = {
  day: number;
  activities: TripActivity[];
  onAddActivity: () => void;
  onRemoveActivity: (activityIndex: number) => void;
  onActivityChange: (
    activityIndex: number,
    field: TripActivityTextField,
    value: string
  ) => void;
  onDeleteDay: () => void;
  isAccordionOpen: boolean;
  setAccordionOpen: (isOpen: boolean) => void;
};

export const TripDayTable = ({
  day,
  activities,
  onAddActivity,
  onRemoveActivity,
  onActivityChange,
  onDeleteDay,
  isAccordionOpen,
  setAccordionOpen,
}: TripDayTableProps): ReactElement => {
  const { tripData } = useTripContext();
  const shouldHideButtonText = useMediaQuery(MEDIA_QUERY_MAX_WIDTH);

  const lastIndex = activities.length - 1;
  const lastElementActivity = activities[lastIndex].activity;
  const isLastElementActivityEmpty = lastElementActivity === "";

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  const calculateDate = (): string => {
    const date = new Date(tripData.startDate);
    date.setDate(date.getDate() + day - 1);
    return date.toLocaleDateString();
  };

  return (
    <div className={classes.wrapper}>
      <button
        onClick={toggleAccordion}
        className={cn(
          classes.tripDayButton,
          isAccordionOpen && classes.tripDayButtonOpen
        )}
      >
        <h3 className={classes.tripHeader}>
          Day {day} - {calculateDate()}
        </h3>
        {isAccordionOpen ? (
          <FaArrowUp className={classes.accordionIcon} />
        ) : (
          <FaArrowDown className={classes.accordionIcon} />
        )}
      </button>
      {isAccordionOpen && (
        <div className={classes.tripDay}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>
                  Activity
                  <FaTasks className={classes.icon} />
                </th>
                <th>
                  Important Information
                  <FaInfoCircle className={classes.icon} />
                </th>
                <th className={classes.deleteTableHeader}>Delete activity</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <ActivityRow
                  key={index}
                  activity={activity}
                  onChange={(field, value) =>
                    onActivityChange(index, field, value)
                  }
                  onRemove={() => onRemoveActivity(index)}
                  disableDeleteButton={activities.length === 1}
                  activityIndex={index}
                  dayIndex={day}
                />
              ))}
            </tbody>
          </table>
          <div className={classes.dayActions}>
            <Button
              onClick={onAddActivity}
              disabled={isLastElementActivityEmpty} // Fix so it is not disabled when start typing
              icon={<FaPlus />}
              className={
                isLastElementActivityEmpty ? classes.disabled : undefined
              }
              title={
                isLastElementActivityEmpty
                  ? "Add some text to the acitivy on the final row to be able to add more activities"
                  : "Add another activity"
              }
              aria-label="Add another activity"
            >
              {shouldHideButtonText ? "" : "Add another activity"}
            </Button>
            <Button
              onClick={onDeleteDay}
              variant="danger"
              icon={<FaTrash />}
              aria-label="Delete day"
            >
              {shouldHideButtonText ? "" : "Delete day"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
