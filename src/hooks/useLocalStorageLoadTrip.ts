import { useEffect } from 'react';
import { Trip } from '../types/Trip';
import { SaveableTrip } from '../types/SaveabletTrip';
import { mapSaveableTripToTrip } from '../utils/localStorageUtils';

export const useLocalStorageLoadTrip = (
	key: string,
	setTripData: (value: Trip) => void
) => {
	useEffect(() => {
		const loadData = () => {
			const savedData = localStorage.getItem(key);
			if (savedData) {
				const saveableTripParsed = JSON.parse(savedData) as SaveableTrip;
				const tripData: Trip = mapSaveableTripToTrip(saveableTripParsed);
				setTripData(tripData);
			}
		};
		loadData();
	}, [key, setTripData]);
};
