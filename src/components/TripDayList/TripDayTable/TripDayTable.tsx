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
  const lastIndex = activities.length - 1;
  const lastElementActivity = activities[lastIndex].activity;
  const isLastElementActivityEmpty = lastElementActivity === "";

  const toggleAccordion = () => {
    setAccordionOpen(!isAccordionOpen);
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
        <h3 className={classes.tripHeader}>Day {day}</h3>
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
            >
              Add another activity
            </Button>
            <Button onClick={onDeleteDay} variant="danger" icon={<FaTrash />}>
              Delete day
            </Button>
          </div>
        </div>
      )}
    </div>
  );
  /*return (
		<div className={classes.tripDay}>
			<h3 className={classes.tripHeader}>Day {day}</h3>
			<table className={classes.table}>
				<thead>
					<tr>
						<th>
							Activity
							<FaTasks className={classes.icon} />
						</th>
						<th>
							Important Information
							<FaInfoCircle className={classes.icon} />
						</th>
						<th>
							Other Information
							<FaClipboardList className={classes.icon} />
						</th>
						<th>
							Image Upload
							<FaImage className={classes.icon} />
						</th>
						<th className={classes.deleteTableHeader}>Delete activity</th>
					</tr>
				</thead>
				<tbody>
					{activities.map((activity, index) => (
						<ActivityRow
							key={index}
							activity={activity}
							onChange={(field, value) => onActivityChange(index, field, value)}
							onImageUpload={(file) => onImageUpload(index, file)}
							onRemove={() => onRemoveActivity(index)}
						/>
					))}
				</tbody>
			</table>
			<div className={classes.dayActions}>
				<Button
					onClick={onAddActivity}
					disabled={isLastElementAcitivityEmpty}
					icon={<FaPlus />}
					className={isLastElementAcitivityEmpty ? classes.disabled : undefined}
					title={
						isLastElementAcitivityEmpty
							? 'Add some text to the acitivy on the final row to be able to add more activities'
							: 'Add another activity'
					}
				>
					Add another activity
				</Button>
				<Button onClick={onDeleteDay} variant="danger" icon={<FaTrash />}>
					Delete day
				</Button>
			</div>
		</div>
	);
	*/
};
