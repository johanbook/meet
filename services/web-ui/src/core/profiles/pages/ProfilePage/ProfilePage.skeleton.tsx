import { ReactElement } from "react";

import { Skeleton } from "@mui/material";

import { Center } from "src/components/ui/Center";

export function ProfilePageSkeleton(): ReactElement {
  return (
    <>
      <Center>
        <Skeleton height={160} variant="circular" width={160} />
      </Center>

      <Center>
        <Skeleton height={60} width={120} />
      </Center>

      <Center>
        <Skeleton height={60} width={240} />
      </Center>
    </>
  );
}
