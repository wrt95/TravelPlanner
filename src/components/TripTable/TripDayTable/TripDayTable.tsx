import { ReactElement } from 'react';
import classes from './TripDayTable.module.css';
import { ActivityRow } from '../ActivityRow';
import { TripActivity } from '../../../types/TripDay';
import { Button } from '../../Button';
import { FaPlus, FaTrash } from 'react-icons/fa';

type TripDayTableProps = {
	day: number;
	activities: TripActivity[];
	onAddActivity: () => void;
	onRemoveActivity: (activityIndex: number) => void;
	onActivityChange: (
		activityIndex: number,
		field: keyof TripActivity,
		value: string
	) => void;
	onImageUpload: (activityIndex: number, file: File | null) => void;
	onDeleteDay: () => void;
};

export const TripDayTable = ({
	day,
	activities,
	onAddActivity,
	onRemoveActivity,
	onActivityChange,
	onImageUpload,
	onDeleteDay,
}: TripDayTableProps): ReactElement => {
	return (
		<div className={classes.tripDay}>
			<h3 className={classes.tripHeader}>Day {day}</h3>
			<table className={classes.table}>
				<thead>
					<tr>
						<th>Activity</th>
						<th>Important Information</th>
						<th>Other Information</th>
						<th>Image Upload</th>
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
				<Button onClick={onAddActivity} icon={<FaPlus />}>
					Add another activity
				</Button>
				<Button onClick={onDeleteDay} variant="danger" icon={<FaTrash />}>
					Delete day
				</Button>
			</div>
		</div>
	);
};
