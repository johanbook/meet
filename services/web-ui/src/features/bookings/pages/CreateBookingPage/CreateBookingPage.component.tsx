import { ReactElement } from "react";

import { Box, Stack, Typography } from "@mui/material";

const WEEKS = [1, 2, 3, 4];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CreateBookingPageComponent(): ReactElement {
  return (
    <>
      <Typography gutterBottom variant="h5">
        Pick a date
      </Typography>

      <Stack gap={1}>
        {WEEKS.map((week) => (
          <Box key={week}>
            <Stack direction="row" gap={1}>
              {DAYS.map((day) => (
                <Box
                  key={week + day}
                  sx={{
                    backgroundColor: "success.main",
                    p: 1,
                    borderRadius: 1,
                  }}
                >
                  {day}
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
}
