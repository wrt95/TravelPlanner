export type TripActivity = {
	activity: string;
	importantInformation?: string;
	otherInformation?: string;
	image?: File | null;
};

export type TripDay = {
	day: number;
	activities: TripActivity[];
};
