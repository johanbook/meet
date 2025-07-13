import { ReactElement, useState } from "react";

import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";

import { getDateGrid } from "./utils";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface BookingDateProps {
  isSelected: boolean;
  onClick: () => void;
  value: dayjs.Dayjs;
}

function BookingDate({
  isSelected,
  onClick,
  value,
}: BookingDateProps): ReactElement {
  let backgroundColor = isSelected ? "info.main" : "success.main";
  const isDisabled = value.isBefore(dayjs());

  if (isDisabled) {
    backgroundColor = "gray";
  }

  return (
    <Box
      onClick={onClick}
      sx={{
        backgroundColor,
        borderRadius: 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        p: 1,
      }}
    >
      {value.format("DD")}
    </Box>
  );
}

export function CreateBookingPageComponent(): ReactElement {
  const [selectedDate, setSelected] = useState<dayjs.Dayjs | undefined>();
  const [time, setTime] = useState<string>("");

  const daysInMonth = getDateGrid();

  return (
    <>
      <Typography gutterBottom variant="h5">
        Pick a date
      </Typography>

      <Stack direction="row" gap={2} sx={{ mb: 1 }}>
        {DAYS.map((day) => (
          <Typography color="textSecondary" key={day}>
            {day}
          </Typography>
        ))}
      </Stack>

      <Stack gap={1}>
        {Object.entries(daysInMonth).map(([week, days]) => (
          <Box key={week}>
            <Stack direction="row" gap={1}>
              {days.map((day) => (
                <BookingDate
                  key={week + day}
                  isSelected={day === selectedDate}
                  onClick={() => setSelected(day)}
                  value={day}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      {selectedDate && (
        <>
          <Typography sx={{ pt: 4 }} variant="h5">
            Pick arrival time
          </Typography>

          <Box>
            <RadioGroup
              onChange={(event) => setTime(event.target.value)}
              value={time}
            >
              <FormControlLabel control={<Radio />} label="9.00" value="9" />
              <FormControlLabel control={<Radio />} label="12.00" value="12" />
              <FormControlLabel control={<Radio />} label="15.00" value="15 " />
            </RadioGroup>
          </Box>
        </>
      )}

      <Button
        disabled={!selectedDate || !time}
        fullWidth
        sx={{ mt: 8 }}
        variant="contained"
      >
        Book
      </Button>
    </>
  );
}
