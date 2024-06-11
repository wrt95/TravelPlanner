import React, { createContext, useContext, useState } from 'react';
import { Trip } from '../../types/TripDay';

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
	const [tripData, setTripData] = useState<Trip>(initialTrip);

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
