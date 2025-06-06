import { useEffect } from "react";

import { config } from "src/config";

interface IUseMetaDataProps {
  title?: string;
}

export function useMetaData({ title }: IUseMetaDataProps) {
  useEffect(() => {
    document.title = title
      ? `${title} | ${config.APP.NAME}`
      : `${config.APP.NAME}`;
  }, [title]);
}
