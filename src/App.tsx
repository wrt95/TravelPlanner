import { TripContextProvider } from "./contexts/TripContext";
import { TripPlanner } from "./components/TripPlanner";

/*
	TODO LIST
		- context for each table activity
		- Maybe move "download", "reset", and a "collapse all" button be on right side of the page
		- Make it possible to edit destination and start date
		- Add button to "append files to your PDF and download"
		- Make it responsive
		- Make Textarea the lineheight of the number of lines in the box
		- Max max length of activities pr. day and max length of days. 
		    - Days - max 30
			- Activities pr. day - 10.
		- Add button to close all days.
		- Make it possible to have several trips??
			- Create a dashboard - list of my trips and a button to create new trip
			- Managed by routing
		- Fix the PDF
			- plit the activities more, add sub headers
			- Fix layout and how things are set up
			- Add icons
			- Only show
*/

export const App = () => {
  return (
    <TripContextProvider>
      <TripPlanner />
    </TripContextProvider>
  );
};
