import { Trip, TripActivity, TripDay } from '../types/Trip';
import { base64ToFile, fileToBase64 } from '../utils/fileUtils';
import {
	SaveableTrip,
	SaveableTripActivity,
	SaveableTripDay,
} from '../types/SaveabletTrip';

export const mapTripToSaveableTrip = async (
	trip: Trip
): Promise<SaveableTrip> => {
	const saveableTrip: SaveableTrip = {
		destination: trip.destination,
		days: await mapTripDaysToSaveableTripDays(trip.days),
	};
	return saveableTrip;
};

const mapTripDaysToSaveableTripDays = async (
	tripDays: TripDay[]
): Promise<SaveableTripDay[]> => {
	const saveableTripDays: SaveableTripDay[] = await Promise.all(
		tripDays.map(async (day) => ({
			day: day.day,
			activities: await mapTripActivitiesToSaveableTripActivities(
				day.activities
			),
			isAccordionOpen: day.isAccordionOpen,
		}))
	);
	return saveableTripDays;
};

const mapTripActivitiesToSaveableTripActivities = async (
	tripActivities: TripActivity[]
): Promise<SaveableTripActivity[]> => {
	const saveableTripActivities: SaveableTripActivity[] = await Promise.all(
		tripActivities.map(async (activity) =>
			mapTripActivityToSaveableTripActivity(activity)
		)
	);
	return saveableTripActivities;
};

const mapTripActivityToSaveableTripActivity = async (
	tripActivity: TripActivity
): Promise<SaveableTripActivity> => {
	const imageBase64 = tripActivity.image
		? await fileToBase64(tripActivity.image)
		: '';
	const saveableTripActivity: SaveableTripActivity = {
		activity: tripActivity.activity,
		importantInformation: tripActivity.importantInformation,
		otherInformation: tripActivity.otherInformation,
		imageBase64,
		imageFileName: tripActivity.image?.name ?? '',
	};
	return saveableTripActivity;
};

export const mapSaveableTripToTrip = (saveableTrip: SaveableTrip): Trip => {
	const trip: Trip = {
		destination: saveableTrip.destination,
		days: mapSaveableTripDaysToTripDays(saveableTrip.days),
	};
	return trip;
};

const mapSaveableTripDaysToTripDays = (
	saveableTripDays: SaveableTripDay[]
): TripDay[] => {
	const tripDays: TripDay[] = saveableTripDays.map((day) => ({
		day: day.day,
		activities: mapSaveableTripActivitiesToTripActivities(day.activities),
		isAccordionOpen: day.isAccordionOpen,
	}));
	return tripDays;
};

const mapSaveableTripActivitiesToTripActivities = (
	saveableTripActivities: SaveableTripActivity[]
): TripActivity[] => {
	const tripActivities: TripActivity[] = saveableTripActivities.map(
		(activity) => ({
			activity: activity.activity,
			importantInformation: activity.importantInformation || '',
			otherInformation: activity.otherInformation || '',
			image: activity.imageBase64
				? base64ToFile(
						activity.imageBase64,
						activity?.imageFileName ?? 'uploaded_image'
				  )
				: null,
		})
	);
	return tripActivities;
};
