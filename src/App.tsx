import { TripContextProvider } from "./contexts/TripContext";
import { TripPlanner } from "./components/TripPlanner";

/*
	TODO LIST
		- context for each table activity
		- Update colours for background and the "cards"
		- Update keyboard accessible color for the buttons
		- Update keyboard accessible color for the textfields
		- Maybe move "download", "reset", and a "collapse all" button be on right side of the page
		- Make it possible to edit destination
		- Add start date to "create trip"
		    - Show and calculate the date next to the day: "Day 1 - 01.08.2024" 
		- Remove photo column. 
		- Add button to "append files to your PDF and download"
		- BUG - clicking "Add Another Activity" copies the value of the first row.
		- BUG - clicking "Add Another Day" copies the value of the previous day.  
		- Make it responsive
		- Make Textarea the lineheight of the number of lines in the box
		- Max max length of activities pr. day and max length of days. 
		    - Days - max 30
			- Activities pr. day - 10.
		- Add button to close all days.
		- Make it possible to have several trips
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
