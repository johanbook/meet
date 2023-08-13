import { useEffect, useState } from "react";

import { blobToBase64 } from "src/utils/blob";

interface PhotoProps {
  alt: string;
  src: Blob;
}

export function Photo({ alt, src, ...props }: PhotoProps) {
  const [parsedSrc, setParsedSrc] = useState("");

  useEffect(() => {
    async function parseBlob() {
      setParsedSrc(await blobToBase64(src));
    }

    parseBlob();
  }, [src]);

  return <img alt={alt} src={parsedSrc} {...props} />;
}
