import React, { ReactElement } from 'react';
import { TripActivity, TripDay } from '../../types/TripDay';
import { TripDayTable } from './TripDayTable';
import { Button } from '../Button';

const newDay: TripActivity = {
	activity: '',
	importantInformation: '',
	otherInformation: '',
	image: null,
};
type TripTableProps = {
	days: number;
	tripData: TripDay[];
	setTripData: React.Dispatch<React.SetStateAction<TripDay[]>>;
};

export const TripTable = ({
	days,
	tripData,
	setTripData,
}: TripTableProps): ReactElement => {
	const handleAddRow = (dayIndex: number) => {
		const newTripData = [...tripData];
		newTripData[dayIndex].activities.push(newDay);
		setTripData(newTripData);
	};

	const handleActivityChange = (
		dayIndex: number,
		activityIndex: number,
		field: keyof TripActivity,
		value: string | File | null
	) => {
		const newTripDays = [...tripData];
		if (field === 'image') {
			newTripDays[dayIndex].activities[activityIndex][field] =
				value as File | null;
		} else {
			newTripDays[dayIndex].activities[activityIndex][field] = value as string;
		}
		setTripData(newTripDays);
	};

	const handleImageUpload = (
		dayIndex: number,
		activityIndex: number,
		file: File | null
	) => {
		const newTripDays = [...tripData];
		newTripDays[dayIndex].activities[activityIndex].image = file;
		setTripData(newTripDays);
	};

	const handleRemoveRow = (dayIndex: number, activityIndex: number) => {
		const newTripData = [...tripData];
		newTripData[dayIndex].activities.splice(activityIndex, 1);
		setTripData(newTripData);
	};

	// TODO - Update the name of the other days when removing
	const handleDeleteDay = (dayIndex: number) => {
		const newTripData = [...tripData];
		newTripData.splice(dayIndex, 1);
		setTripData(newTripData);
	};

	const handleAddDay = () => {
		setTripData([
			...tripData,
			{
				day: tripData.length + 1,
				activities: [newDay],
			},
		]);
	};

	return (
		<div>
			{tripData.map((tripDay, dayIndex) => (
				<TripDayTable
					key={tripDay.day}
					day={tripDay.day}
					activities={tripDay.activities}
					onAddActivity={() => handleAddRow(dayIndex)}
					onActivityChange={(activityIndex, field, value) =>
						handleActivityChange(dayIndex, activityIndex, field, value)
					}
					onImageUpload={(activityIndex, file) =>
						handleImageUpload(dayIndex, activityIndex, file)
					}
					onRemoveActivity={(activityIndex: number) =>
						handleRemoveRow(dayIndex, activityIndex)
					}
					onDeleteDay={() => handleDeleteDay(dayIndex)}
				/>
			))}
			<Button onClick={handleAddDay}>Add Another Day</Button>
		</div>
	);
};
