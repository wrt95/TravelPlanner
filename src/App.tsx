import { TripContextProvider } from './contexts/TripContext';
import { TripPlanner } from './components/TripPlanner';

/*
	TODO LIST
		- context for each table activity
		- Update colours for background and the "cards"
		- Update colours for the buttons
		- Update colours for the textfields
		- Make it possible to edit destination
		- Add icons to table header
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
