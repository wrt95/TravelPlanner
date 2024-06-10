export type TripActivity = {
	activity: string;
	importantInformation?: string;
	otherInformation?: string;
	image?: string | null;
};

export type TripDay = {
	day: number;
	activities: TripActivity[];
};
