import { ScrollView, Text, View } from "react-native";

import { TimeSeriesDetails } from "src/api";
import { Chip, List, ListItem, Typography } from "src/components/ui";
import { useTheme } from "src/core/theme";
import { timeSince } from "src/utils";

interface TimeSeriesPointListProps {
  timeSeries: TimeSeriesDetails;
}

// The mobile Chip mirrors the web palette minus "secondary"; the neutral
// "default" slot keeps the same five-color rotation by label index.
const LABEL_COLORS = [
  "primary",
  "default",
  "info",
  "success",
  "warning",
] as const;

export function TimeSeriesPointList({ timeSeries }: TimeSeriesPointListProps) {
  const theme = useTheme();

  if (timeSeries.points.length === 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Typography color="textSecondary" variant="body2">
          No points added yet
        </Typography>
      </View>
    );
  }

  return (
    <ScrollView style={{ maxHeight: 320 }}>
      <List>
        {timeSeries.points.map((point) => (
          <ListItem key={point.id}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <View
                style={{
                  alignItems: "center",
                  backgroundColor: theme.palette.primary,
                  borderRadius: 8,
                  height: 40,
                  justifyContent: "center",
                  width: 40,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {point.value}
                </Text>
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: theme.palette.text.primary,
                      flex: 1,
                      fontSize: 16,
                    }}
                  >
                    {point.description}
                  </Text>
                  <Chip
                    color={
                      LABEL_COLORS[
                        timeSeries.labels.indexOf(point.label) %
                          LABEL_COLORS.length
                      ]
                    }
                    label={point.label}
                  />
                </View>
                <Text
                  style={{
                    color: theme.palette.text.secondary,
                    fontSize: 14,
                    marginTop: 2,
                  }}
                >
                  {timeSince(point.createdAt)}
                </Text>
              </View>
            </View>
          </ListItem>
        ))}
      </List>
    </ScrollView>
  );
}
