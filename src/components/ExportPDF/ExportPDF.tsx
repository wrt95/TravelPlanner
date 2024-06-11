import { ReactElement } from 'react';
import { TripDay } from '../../types/TripDay';
import {
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
	PDFDownloadLink,
} from '@react-pdf/renderer';
import { Button } from '../Button';
import { useTripContext } from '../../contexts/TripContext';

const styles = StyleSheet.create({
	page: {
		fontFamily: 'Helvetica',
		padding: 20,
	},
	header: {
		fontSize: 24,
		marginBottom: 20,
		textAlign: 'center',
	},
	dayHeader: {
		fontSize: 18,
		marginTop: 20,
		marginBottom: 10,
	},
	activityContainer: {
		marginBottom: 20,
	},
	activityHeader: {
		fontSize: 16,
		marginBottom: 10,
	},
	activityText: {
		marginBottom: 5,
	},
	activityImage: {
		marginBottom: 10,
		width: '100%',
		height: 'auto',
	},
	downloadButton: {
		width: '100%',
		textAlign: 'center',
		marginTop: 20,
	},
});

export const ExportPDF = (): ReactElement => {
	const { tripData } = useTripContext();

	return (
		<PDFDownloadLink
			document={
				<Document>
					{tripData.days.map((tripDay: TripDay, index: number) => (
						<Page key={index} style={styles.page}>
							<Text style={styles.header}>Day {tripDay.day}</Text>
							{tripDay.activities.map((activity, activityIndex) => (
								<View key={activityIndex} style={styles.activityContainer}>
									<Text style={styles.activityHeader}>{activity.activity}</Text>
									<Text style={styles.activityText}>
										{activity.importantInformation}
									</Text>
									<Text style={styles.activityText}>
										{activity.otherInformation}
									</Text>
									{activity.image && (
										<Image
											style={styles.activityImage}
											src={URL.createObjectURL(activity.image)}
										/>
									)}
								</View>
							))}
						</Page>
					))}
				</Document>
			}
			fileName="trip_report.pdf"
		>
			{({ blob, url, loading, error }) =>
				loading ? (
					<View>Loading...</View>
				) : (
					<View style={styles.downloadButton}>
						<Button>Download PDF</Button>
					</View>
				)
			}
		</PDFDownloadLink>
	);
};
