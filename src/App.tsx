import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { DaysInputForm } from './components/DaysInputForm';
import { TripTable } from './components/TripTable';
import { TripDay } from './types/TripDay';
import { Button } from './components/Button';
import { ExportPDF } from './components/ExportPDF';

/*
	TODO LIST
		- useContext
		- Logic to rename the days when deleting a day
		- Textfield to add name of the trip 
		- Make it all save in the local storage
		- Update colours for background and the "cards"
		- Update colours for the buttons
		- Update colours for the textfields
		- Add icons to all buttons 
		- Add icons to table header
		- Create hooks of the useEffects
		- Prevent the days input from having negative values 
		- Disable add activity button when previous activity name is empty
		- More style on the PDF
			- Split the activities more, add sub headers
		- Style the images in the PDF
		- Add pricing column
		- Make it possible to have several trips
			- Create a dashboard - list of my trips and a button to create new trip
			- Managed by routing
*/

export const App = () => {
	const [tripData, setTripData] = useState<TripDay[]>([]);

	// MAKE THESE HOOKS
	useEffect(() => {
		const savedTripData = localStorage.getItem('tripData');
		if (savedTripData) {
			setTripData(JSON.parse(savedTripData));
		}
	}, []);
	useEffect(() => {
		localStorage.setItem('tripData', JSON.stringify(tripData));
	}, [tripData]);

	const handleSetDays = (days: number) => {
		const newTripData: TripDay[] = Array.from({ length: days }, (_, i) => ({
			day: i + 1,
			activities: [{ activity: '', important: '', other: '', image: null }],
		}));
		setTripData(newTripData);
	};

	const resetData = () => {
		setTripData([]);
		// Add a "ARE YOU SURE?"
		localStorage.removeItem('tripData');
	};

	return (
		<div className={classes.pageWrapper}>
			<h1 className={classes.pageHeader}>Travel Planner</h1>
			<p className={classes.pageDescription}>
				To plan your trip, you must first select the number of days you will be
				traveling for.
			</p>
			<p className={classes.pageDescription}>
				You will be able to add and remove days later on as well.
			</p>
			{tripData.length === 0 ? (
				<DaysInputForm setDays={handleSetDays} />
			) : (
				<p className={classes.tripLength}>
					Your trip is {tripData.length} days
				</p>
			)}
			{tripData.length > 0 && (
				<TripTable tripData={tripData} setTripData={setTripData} />
			)}
			<div className={classes.actionButtons}>
				<ExportPDF tripDays={tripData} />
				<Button onClick={resetData} variant="danger">
					Reset form
				</Button>
			</div>
		</div>
	);
};
