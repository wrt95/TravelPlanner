import { ReactElement } from "react";
import { TripDay } from "../../types/Trip";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { Button } from "../Button";
import { useTripContext } from "../../contexts/TripContext";
import { FaDownload } from "react-icons/fa";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
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
  downloadButton: {
    width: "100%",
    textAlign: "center",
  },
  downloadLink: {
    textDecoration: "none",
  },
});

export const ExportPDF = (): ReactElement => {
  const { tripData } = useTripContext();

  return (
    <PDFDownloadLink
      style={styles.downloadLink}
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
          <div style={styles.downloadButton}>
            <Button icon={<FaDownload />}>Download PDF</Button>
          </div>
        ) : (
          <div style={styles.downloadButton}>
            <Button icon={<FaDownload />}>Download PDF</Button>
          </div>
        )
      }
    </PDFDownloadLink>
  );
};
