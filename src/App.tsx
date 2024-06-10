import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { DaysInputForm } from './components/DaysInputForm';
import { TripTable } from './components/TripTable';
// import { ExportPDF } from './components/ExportPDF';
import { TripDay } from './types/TripDay';
import { Button } from './components/Button';

export const App = () => {
	const [days, setDays] = useState<number>(0);
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
		setDays(days);
		const newTripData: TripDay[] = Array.from({ length: days }, (_, i) => ({
			day: i + 1,
			activities: [{ activity: '', important: '', other: '', image: null }],
		}));
		setTripData(newTripData);
	};

	const resetData = () => {
		setTripData([]);
		setDays(0);
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
			{days === 0 ? (
				<DaysInputForm setDays={handleSetDays} />
			) : (
				<p className={classes.tripLength}>Your trip is {days} days</p>
			)}
			{days > 0 && (
				<TripTable days={days} tripData={tripData} setTripData={setTripData} />
			)}
			{/*<ExportPDF tripData={tripData} />*/}
			<Button
				className={classes.resetButton}
				onClick={resetData}
				variant="danger"
			>
				Reset form
			</Button>
		</div>
	);
};
