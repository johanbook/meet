import { ReactElement } from "react";

import { AddRounded } from "@mui/icons-material";
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
import { Fab } from "src/components/ui/Fab";
import { useDialog } from "src/core/dialog";
import { timeSince } from "src/utils/time";

import { AddTimeSeriesPointDialog } from "../../components/AddTimeSeriesPointDialog";

const LABEL_COLORS: ChipProps["color"][] = ["primary", "secondary"];

const getLabelColor = (index: number) =>
  LABEL_COLORS[index % LABEL_COLORS.length];

interface TimeSeriesPageComponentProps {
  timeSeries: TimeSeriesDetails;
}

export function TimeSeriesPageComponent({
  timeSeries,
}: TimeSeriesPageComponentProps): ReactElement {
  const { openDialog } = useDialog();

  const handleOpenForm = () => {
    openDialog(AddTimeSeriesPointDialog, { timeSeriesId: timeSeries.id });
  };

  return (
    <Box>
      <Typography variant="h6">{timeSeries.name}</Typography>
      <Typography color="textSecondary">{timeSeries.description}</Typography>

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
                    color={getLabelColor(
                      timeSeries.labels.indexOf(point.label),
                    )}
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

      <Fab onClick={handleOpenForm}>
        <AddRounded />
      </Fab>
    </Box>
  );
}
