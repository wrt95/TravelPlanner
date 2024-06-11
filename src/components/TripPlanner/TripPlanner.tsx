import { ReactElement, useEffect } from 'react';
import classes from './TripPlanner.module.css';
import { CreateTripForm } from '../CreateTripForm';
import { TripTable } from '../TripTable';
import { Button } from '../Button';
import { ExportPDF } from '../ExportPDF';
import { useTripContext } from '../../contexts/TripContext';
import { initialTrip } from '../../contexts/TripContext/TripContext';

export const TripPlanner = (): ReactElement => {
	const { tripData, setTripData } = useTripContext();

	// MAKE THESE HOOKS
	useEffect(() => {
		const savedTripData = localStorage.getItem('tripData');
		if (savedTripData) {
			setTripData(JSON.parse(savedTripData));
		}
	}, [setTripData]);

	useEffect(() => {
		localStorage.setItem('tripData', JSON.stringify(tripData));
	}, [tripData]);

	const resetData = () => {
		setTripData(initialTrip);
		// Add a "ARE YOU SURE?"
		localStorage.removeItem('tripData');
	};

	return (
		<div className={classes.pageWrapper}>
			<h1 className={classes.pageHeader}>Travel Planner</h1>
			{tripData.days.length === 0 ? (
				<CreateTripForm />
			) : (
				<p className={classes.tripLength}>
					Your trip to "{tripData.destination}" will be {tripData.days.length}{' '}
					days
				</p>
			)}
			{tripData && tripData.days.length > 0 && (
				<>
					<TripTable />
					<div className={classes.actionButtons}>
						<ExportPDF />
						<Button onClick={resetData} variant="danger">
							Reset form
						</Button>
					</div>
				</>
			)}
		</div>
	);
};
