# Dialogs

Dialogs should be used for actions that require immediate user interaction.

Dialogs are managed through the `useDialog` hook from `src/core/dialog`. For
example, a dialog can be defined as as below:

```tsx
import { ReactElement } from "react";

import { Dialog } from "src/components/ui";
import { GlobalDialogProps } from "src/core/dialog";

interface MyDialogProps extends GlobalDialogProps {
  text: string;
}

function MyDialog ({ closeDialog, text }: MyDialogProps): ReactElement => {
  return (
    <Dialog>
      {text}
      <p onClick={closeDialog}>Click me to close the dialog!</p>
    </Dialog>
  );
};
```

where the properties in `GlobalDialogProps` will be automatically injected into
the component when opening the dialog via the hook as done below:

```tsx
import { useDialog } from "src/core/dialog";

const MyComponent: React.FC = () => {
  const { openDialog } = useDialog();

  function handleClick() {
    openDialog(MyDialog, {
      text: "my-text",
    });
  }

  return <p onClick={handleClick}>Click me!</p>;
};
```

The `useDialog` also exposes properties for closing a dialog or seeing if it is
currently open.
