import React, { ReactElement } from 'react';
import { TripActivity, TripDay } from '../../types/TripDay';
import { TripDayTable } from './TripDayTable';

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
		newTripData[dayIndex].activities.push({
			activity: '',
			importantInformation: '',
			otherInformation: '',
			image: null,
		});
		setTripData(newTripData);
	};

	const handleActivityChange = (
		dayIndex: number,
		activityIndex: number,
		field: keyof TripActivity,
		value: string
	) => {
		const newTripData = [...tripData];
		newTripData[dayIndex].activities[activityIndex][field] = value;
		setTripData(newTripData);
	};

	const handleImageUpload = (
		dayIndex: number,
		activityIndex: number,
		file: File
	) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const newTripData = [...tripData];
			newTripData[dayIndex].activities[activityIndex].image =
				reader.result as string;
			setTripData(newTripData);
		};
		reader.readAsDataURL(file);
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
				/>
			))}
		</div>
	);
};
