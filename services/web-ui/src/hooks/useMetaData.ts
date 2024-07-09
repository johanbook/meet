import { useEffect } from "react";

import { config } from "src/config";

interface IUseMetaDataProps {
  title?: string;
}

export function useMetaData({ title }: IUseMetaDataProps) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${config.APP.NAME}`;
    }
  }, [title]);
}
