export type SaveableTrip = {
	destination: string;
	days: SaveableTripDay[];
};

export type SaveableTripDay = {
	day: number;
	activities: SaveableTripActivity[];
};

export type SaveableTripActivity = {
	activity: string;
	importantInformation?: string;
	otherInformation?: string;
	imageBase64?: string;
	imageFileName?: string;
};
