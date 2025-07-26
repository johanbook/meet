import { ReactElement } from "react";

import { Favorite } from "@mui/icons-material";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export function LoadingView(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Favorite
        aria-label="Loading"
        animate={{
          scale: [1, 1.5, 1],
        }}
        color="primary"
        component={motion.svg}
        sx={{ fontSize: 60, mb: 2 }}
        transition={{ repeat: Number.POSITIVE_INFINITY }}
      />
    </Box>
  );
}
