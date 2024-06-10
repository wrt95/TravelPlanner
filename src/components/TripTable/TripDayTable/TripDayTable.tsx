import React, { ReactElement } from 'react';
import classes from './TripDayTable.module.css';
import { ActivityRow } from '../ActivityRow';
import { TripActivity } from '../../../types/TripDay';
import { Button } from '../../Button';

type TripDayTableProps = {
	day: number;
	activities: TripActivity[];
	onAddActivity: () => void;
	onActivityChange: (
		activityIndex: number,
		field: keyof TripActivity,
		value: string
	) => void;
	onImageUpload: (activityIndex: number, file: File) => void;
};

export const TripDayTable = ({
	day,
	activities,
	onAddActivity,
	onActivityChange,
	onImageUpload,
}: TripDayTableProps): ReactElement => {
	return (
		<div className={classes.wrapper}>
			<h3 className={classes.tripHeader}>Day {day}</h3>
			<table>
				<thead>
					<tr>
						<th>Activity</th>
						<th>Important Information</th>
						<th>Other Information</th>
						<th>Image Upload</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{activities.map((activity, index) => (
						<ActivityRow
							key={index}
							activity={activity}
							onChange={(field, value) => onActivityChange(index, field, value)}
							onImageUpload={(file) => onImageUpload(index, file)}
						/>
					))}
				</tbody>
			</table>
			<Button onClick={onAddActivity}>Add another activity</Button>
		</div>
	);
};
