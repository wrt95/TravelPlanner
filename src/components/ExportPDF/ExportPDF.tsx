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

const MARGIN_BOTTOM_SEPARATOR = 10;
const MARGIN_VERTICAL_DIVIDER = 30;
const FONT_SIZE_TEXT = 18;
const FONT_SIZE_SMALL_TEXT = FONT_SIZE_TEXT - 4;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    paddingHorizontal: 50,
    paddingVertical: 40,
  },
  titlePage: {
    textAlign: "center",
    marginBottom: MARGIN_BOTTOM_SEPARATOR,
  },
  destinationTitle: {
    fontSize: 32,
    marginBottom: 30,
  },
  tripInfo: {
    fontSize: FONT_SIZE_TEXT,
    marginBottom: MARGIN_BOTTOM_SEPARATOR,
    lineHeight: 1.3,
  },
  dayHeader: {
    fontSize: 22,
    marginBottom: MARGIN_BOTTOM_SEPARATOR,
    lineHeight: 1.3,
  },
  activityContainer: {
    marginBottom: MARGIN_BOTTOM_SEPARATOR + 10, // Increased spacing between activities
  },
  activityText: {
    marginBottom: 5,
    fontSize: FONT_SIZE_TEXT,
    lineHeight: 1.5,
  },
  importantInfoHeader: {
    fontSize: FONT_SIZE_TEXT,
    marginBottom: 3, // Reduced space between header and content
  },
  importantInfoContent: {
    fontSize: FONT_SIZE_SMALL_TEXT,
    marginBottom: 5,
    lineHeight: 1.3,
  },
  noActivityText: {
    fontStyle: "italic",
    fontSize: FONT_SIZE_TEXT,
    lineHeight: 1.3,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: MARGIN_VERTICAL_DIVIDER,
    marginHorizontal: 0,
  },
  bulletPoint: {
    marginBottom: 3,
    fontSize: FONT_SIZE_SMALL_TEXT,
    lineHeight: 1.3,
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

  // Function to format the date as dd.mm.yyyy
  const formatDate = (dateStr: string, daysToAdd: number = 0): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-GB");
  };

  // Function to add bullet points to non-empty lines in important information
  const formatImportantInformation = (info: string) =>
    info.split("\n").map((line, index) =>
      line.trim() ? (
        <Text key={index} style={styles.bulletPoint}>
          • {line}
        </Text>
      ) : (
        <Text key={index} style={styles.importantInfoContent}>
          {" "}
        </Text>
      )
    );

  return (
    <PDFDownloadLink
      style={styles.downloadLink}
      document={
        <Document>
          <Page style={styles.page}>
            {/* Title Page Content */}
            <View style={styles.titlePage}>
              <Text style={styles.destinationTitle}>
                {tripData.destination}
              </Text>
              <Text style={styles.tripInfo}>
                {formatDate(tripData.startDate)} -{" "}
                {formatDate(tripData.startDate, tripData.days.length - 1)}
              </Text>
              <Text style={styles.tripInfo}>
                {tripData.days.length}{" "}
                {tripData.days.length > 1 ? "days" : "day"}
              </Text>
            </View>

            {/* Divider before the first day */}
            <View style={styles.divider} />

            {/* Days Content */}
            {tripData.days.map((tripDay: TripDay, index: number) => (
              <View key={index}>
                <Text style={styles.dayHeader}>
                  Day {tripDay.day} -{" "}
                  {formatDate(tripData.startDate, tripDay.day - 1)}
                </Text>
                {tripDay.activities.length > 0 &&
                tripDay.activities[0].activity ? (
                  tripDay.activities.map((activity, activityIndex) => (
                    <View key={activityIndex} style={styles.activityContainer}>
                      <Text style={styles.activityText}>
                        Activity: {activity.activity}
                      </Text>
                      <Text style={styles.importantInfoHeader}>
                        Information:
                      </Text>
                      <View style={styles.importantInfoContent}>
                        {activity.importantInformation
                          ? formatImportantInformation(
                              activity.importantInformation
                            )
                          : "No additional information"}
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noActivityText}>
                    No activities added for this day
                  </Text>
                )}
                {/* Divider after each day */}
                <View style={styles.divider} />
              </View>
            ))}
          </Page>
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
