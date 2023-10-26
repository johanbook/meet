import { ReactElement, ReactNode } from "react";

import { Box, Typography } from "@mui/material";

interface PageProps {
  children: ReactNode;
  header?: string | null;
}

export function Page({ children, header }: PageProps): ReactElement {
  return (
    <Box sx={{ paddingTop: 2 }}>
      {header && (
        <Typography gutterBottom variant="h5">
          {header}
        </Typography>
      )}

      {children}
    </Box>
  );
}
