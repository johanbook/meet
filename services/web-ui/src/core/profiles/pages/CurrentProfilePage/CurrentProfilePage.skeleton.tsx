import React from "react";

import { Skeleton } from "@mui/material";

import { Center } from "src/components/ui/Center";

export function CurrentProfilePageSkeleton(): React.ReactElement {
  return (
    <>
      <Center>
        <Skeleton height={200} variant="circular" width={200} />
      </Center>

      <Center>
        <Skeleton height={50} width={120} />
      </Center>

      <Skeleton height={200} />
    </>
  );
}
