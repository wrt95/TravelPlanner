import { ReactElement } from 'react';
import { TripActivity, TripDay } from '../../types/TripDay';
import { TripDayTable } from './TripDayTable';
import { Button } from '../Button';
import { emptyTripActivity } from '../../utils/emptyTripActivity';
import { useTripContext } from '../../contexts/TripContext';

export const TripTable = (): ReactElement => {
	const { tripData, setTripData } = useTripContext();

	const handleAddRow = (dayIndex: number) => {
		const newTripDays: TripDay[] = [...tripData.days];
		newTripDays[dayIndex].activities.push({ ...emptyTripActivity });
		setTripData({ ...tripData, days: newTripDays });
	};

	const handleActivityChange = (
		dayIndex: number,
		activityIndex: number,
		field: keyof TripActivity,
		value: string | File | null
	) => {
		console.log({
			dayIndex,
			activityIndex,
			field,
			value,
		});
		const newTripDays = [...tripData.days];
		if (field === 'image') {
			newTripDays[dayIndex].activities[activityIndex][field] =
				value as File | null;
		} else {
			newTripDays[dayIndex].activities[activityIndex][field] = value as string;
		}
		setTripData({ ...tripData, days: newTripDays });
	};

	const handleImageUpload = (
		dayIndex: number,
		activityIndex: number,
		file: File | null
	) => {
		const newTripDays: TripDay[] = [...tripData.days];
		newTripDays[dayIndex].activities[activityIndex].image = file;
		setTripData({ ...tripData, days: newTripDays });
	};

	const handleRemoveRow = (dayIndex: number, activityIndex: number) => {
		const newTripDays: TripDay[] = [...tripData.days];
		newTripDays[dayIndex].activities.splice(activityIndex, 1);
		setTripData({ ...tripData, days: newTripDays });
	};

	const handleDeleteDay = (dayIndex: number) => {
		const newTripDays: TripDay[] = [...tripData.days];
		newTripDays.splice(dayIndex, 1);

		const dataMappedWithNewDays = newTripDays.map(
			(data: TripDay, index: number) => ({
				...data,
				day: index + 1,
			})
		);
		setTripData({ ...tripData, days: dataMappedWithNewDays });
	};

	const handleAddDay = () => {
		const newTripDay: TripDay = {
			day: tripData.days.length + 1,
			activities: [emptyTripActivity],
		};
		const updatedTripDays: TripDay[] = [...tripData.days, newTripDay];
		setTripData({ ...tripData, days: updatedTripDays });
	};

	return (
		<div>
			{tripData.days.map((tripDay: TripDay, dayIndex: number) => (
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
