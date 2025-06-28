import { useContext } from "react";

import { GlobalDialogContext } from "./dialog.context";

export function useDialog() {
  const props = useContext(GlobalDialogContext);

  if (!props) {
    throw new Error(
      "Could not find global dialog context. Make sure provider is registered as parent.",
    );
  }

  return props;
}
