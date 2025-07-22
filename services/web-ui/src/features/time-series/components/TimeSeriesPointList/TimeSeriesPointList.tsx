import { ReactElement } from "react";

import {
  Avatar,
  Box,
  Chip,
  ChipProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { TimeSeriesDetails } from "src/api";
import { timeSince } from "src/utils/time";

const LABEL_COLORS: ChipProps["color"][] = [
  "primary",
  "secondary",
  "info",
  "success",
  "warning",
];

const getLabelColor = (index: number) =>
  LABEL_COLORS[index % LABEL_COLORS.length];

interface TimeSeriesPointListProps {
  timeSeries: TimeSeriesDetails;
}

export function TimeSeriesPointList({
  timeSeries,
}: TimeSeriesPointListProps): ReactElement {
  if (timeSeries.points.length === 0) {
    return <Typography color="textSecondary">No points added yet</Typography>;
  }

  return (
    <List>
      {timeSeries.points.map((point) => (
        <ListItem key={point.id}>
          <ListItemIcon>
            <Avatar>{point.value}</Avatar>
          </ListItemIcon>
          <ListItemText
            primary={
              <Box
                component="span"
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                <span>{point.description}</span>
                <Chip
                  color={getLabelColor(timeSeries.labels.indexOf(point.label))}
                  label={point.label}
                  size="small"
                  variant="outlined"
                />
              </Box>
            }
            secondary={timeSince(point.createdAt)}
          />
        </ListItem>
      ))}
    </List>
  );
}
