import React, { createContext, useContext, useState } from 'react';
import { Trip } from '../../types/Trip';
import { TRIP_DATA_LOCAL_STORAGE_KEY } from '../../components/constants/localStorageConstants';
import { SaveableTrip } from '../../types/SaveabletTrip';
import { mapSaveableTripToTrip } from '../../utils/localStorageUtils';

export type TripContextProps = {
	tripData: Trip;
	setTripData: React.Dispatch<React.SetStateAction<Trip>>;
};

export const initialTrip: Trip = {
	destination: '',
	days: [],
};

const initialTripContext: TripContextProps = {
	tripData: initialTrip,
	setTripData: () => {},
};

export const TripContext = createContext<TripContextProps>(initialTripContext);

export type TripContextProviderProps = {
	children: React.ReactNode;
};

export const TripContextProvider = ({ children }: TripContextProviderProps) => {
	const savedTripData = localStorage.getItem(TRIP_DATA_LOCAL_STORAGE_KEY);
	const [tripData, setTripData] = useState<Trip>(getTripData(savedTripData));

	return (
		<TripContext.Provider
			value={{
				tripData,
				setTripData,
			}}
		>
			{children}
		</TripContext.Provider>
	);
};

export const useTripContext = (): TripContextProps => {
	const context = useContext(TripContext);
	if (context === undefined) {
		throw new Error('useTripContext must be used within a TripContextProvider');
	}
	return context;
};

const getTripData = (savedTripData: string | null): Trip => {
	if (savedTripData === null) {
		return initialTrip;
	}
	const saveableTripParsed = JSON.parse(savedTripData) as SaveableTrip;
	const trip: Trip = mapSaveableTripToTrip(saveableTripParsed);
	return trip;
};
