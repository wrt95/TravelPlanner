import { ReactElement } from 'react';
import classes from './TripPlanner.module.css';
import { CreateTripForm } from '../CreateTripForm';
import { TripTable } from '../TripTable';
import { Button } from '../Button';
import { ExportPDF } from '../ExportPDF';
import { useTripContext } from '../../contexts/TripContext';
import { initialTrip } from '../../contexts/TripContext/TripContext';
import { useLocalStorageLoad } from '../../hooks/useLocalStorageLoad';
import { useLocalStorageSave } from '../../hooks/useLocalStorageSave';
import { TRIP_DATA_LOCAL_STORAGE_KEY } from '../constants/localStorageConstants';

export const TripPlanner = (): ReactElement => {
	const { tripData, setTripData } = useTripContext();

	useLocalStorageLoad(TRIP_DATA_LOCAL_STORAGE_KEY, setTripData);
	useLocalStorageSave(TRIP_DATA_LOCAL_STORAGE_KEY, tripData);

	const resetData = () => {
		const verificationText: string =
			'Are you sure you want to delete your trip? This cannot be reverted.';
		if (window.confirm(verificationText)) {
			setTripData(initialTrip);
			localStorage.removeItem(TRIP_DATA_LOCAL_STORAGE_KEY);
		}
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
