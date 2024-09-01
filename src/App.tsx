import { TripContextProvider } from "./contexts/TripContext";
import { TripPlanner } from "./components/TripPlanner";

/*
	TODO LIST
		- context for each table activity
		- Maybe move "download", "reset", and a "collapse all" button be on right side of the page
		- Add button to "append files to your PDF and download"
		- Make Textarea the lineheight of the number of lines in the box
		- Max max length of activities pr. day and max length of days. 
		    - Days - max 30
			- Activities pr. day - 10.
		- Add button to close all days.
*/

export const App = () => {
  return (
    <TripContextProvider>
      <TripPlanner />
    </TripContextProvider>
  );
};
