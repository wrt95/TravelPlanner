import { useEffect } from 'react';
import { Trip } from '../types/Trip';
import { SaveableTrip } from '../types/SaveabletTrip';
import { mapTripToSaveableTrip } from '../utils/localStorageUtils';

export const useLocalStorageSaveTrip = (key: string, trip: Trip) => {
	useEffect(() => {
		const saveData = async () => {
			const dataToSave: SaveableTrip = await mapTripToSaveableTrip(trip);
			localStorage.setItem(key, JSON.stringify(dataToSave));
		};
		saveData();
	}, [key, trip]);
};
