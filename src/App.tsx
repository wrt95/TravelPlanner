import { TripContextProvider } from "./contexts/TripContext";
import { TripPlanner } from "./components/TripPlanner";

/*
	TODO LIST
		- context for each table activity
		- Update colours for background and the "cards"
		- Update keyboard accessible color for the buttons
		- Update keyboard accessible color for the textfields
		- Make it possible to edit destination
		- Add pricing column
		- Make it responsive
		- Make it possible to have several trips
			- Create a dashboard - list of my trips and a button to create new trip
			- Managed by routing
		- Fix the PDF
			- plit the activities more, add sub headers
			- Fix layout and how things are set up
			- Add icons
			- Fix size of images
			- Only show
*/

export const App = () => {
  return (
    <TripContextProvider>
      <TripPlanner />
    </TripContextProvider>
  );
};
