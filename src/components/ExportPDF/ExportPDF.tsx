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
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { MEDIA_QUERY_MAX_WIDTH } from "../../constants/mediaQueryConstants";

const MARGIN_BOTTOM_SEPERATOR = 10;
const MARGIN_VERTICAL_DIVIDER = 30;

const FONT_SIZE_TEXT = 18;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    paddingHorizontal: 50,
    paddingVertical: 40,
  },
  titlePage: {
    textAlign: "center",
    marginBottom: MARGIN_BOTTOM_SEPERATOR,
  },
  destinationTitle: {
    fontSize: 32,
    marginBottom: 30,
  },
  tripInfo: {
    fontSize: FONT_SIZE_TEXT,
    marginBottom: MARGIN_BOTTOM_SEPERATOR,
  },
  dayHeader: {
    fontSize: 22,
    marginBottom: MARGIN_BOTTOM_SEPERATOR,
  },
  activityContainer: {
    gap: MARGIN_BOTTOM_SEPERATOR,
  },
  activityText: {
    marginBottom: 5,
    fontSize: FONT_SIZE_TEXT,
  },
  noActivityText: {
    fontStyle: "italic",
    fontSize: FONT_SIZE_TEXT,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: MARGIN_VERTICAL_DIVIDER,
    marginHorizontal: 0,
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

  const shouldHideButtonText = useMediaQuery(MEDIA_QUERY_MAX_WIDTH);

  // Function to format the date as dd.mm.yyyy
  const formatDate = (dateStr: string, daysToAdd: number = 0): string => {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + daysToAdd);
    return date.toLocaleDateString("en-GB");
  };

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
              <View key={index} wrap={false}>
                <View style={styles.activityContainer}>
                  <Text style={styles.dayHeader}>
                    Day {tripDay.day} -{" "}
                    {formatDate(tripData.startDate, tripDay.day - 1)}
                  </Text>
                  {tripDay.activities.length > 0 &&
                  tripDay.activities[0].activity ? (
                    tripDay.activities.map((activity, activityIndex) => (
                      <View key={activityIndex}>
                        <Text style={styles.activityText}>
                          Activity - {activity.activity}
                        </Text>
                        <Text style={styles.activityText}>
                          Information -{" "}
                          {activity.importantInformation ||
                            "No additional information"}
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noActivityText}>
                      No activities added for this day
                    </Text>
                  )}
                </View>
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
            <Button icon={<FaDownload />} aria-label="Download PDF">
              {shouldHideButtonText ? "" : "Download PDF"}
            </Button>
          </div>
        ) : (
          <div style={styles.downloadButton}>
            <Button icon={<FaDownload />} aria-label="Download PDF">
              {shouldHideButtonText ? "" : "Download PDF"}
            </Button>
          </div>
        )
      }
    </PDFDownloadLink>
  );
};
