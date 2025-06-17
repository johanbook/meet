import { FC, useEffect, useState } from "react";

import { Carousel } from "src/components/ui/Carousel";
import { blobToBase64 } from "src/utils/blob";

interface BlobPhotosProps {
  srcs: Blob[];
}

export const BlobPhotos: FC<BlobPhotosProps> = ({ srcs }) => {
  const [parsedSrcs, setParsedSrcs] = useState<string[]>([]);

  useEffect(() => {
    async function parseBlobs() {
      setParsedSrcs(await Promise.all(srcs.map((src) => blobToBase64(src))));
    }

    parseBlobs();
  }, [srcs]);

  return (
    <Carousel
      images={parsedSrcs.map((src) => ({
        src,
      }))}
    />
  );
};
