import { TripContextProvider } from './contexts/TripContext';
import { TripPlanner } from './components/TripPlanner';

/*
	TODO LIST

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
	return (
		<TripContextProvider>
			<TripPlanner />
		</TripContextProvider>
	);
};
