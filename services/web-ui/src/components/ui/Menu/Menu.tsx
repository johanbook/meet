import { FC, ReactElement, ReactNode, SyntheticEvent, useState } from "react";

import MuiMenu, { MenuProps as MuiMenuProps } from "@mui/material/Menu";

interface MenuProps extends Omit<MuiMenuProps, "open"> {
  Button: FC<{ onClick: (event: SyntheticEvent) => void }>;
  children: ReactNode;
}

export function Menu({ Button, children, ...props }: MenuProps): ReactElement {
  const [anchorElement, setAnchorElement] = useState<Element | undefined>();
  const open = Boolean(anchorElement);

  function handleClick(event: React.SyntheticEvent) {
    setAnchorElement(event.currentTarget);
  }

  function handleClose() {
    setAnchorElement(undefined);
  }

  return (
    <>
      <Button onClick={handleClick} />

      <MuiMenu
        anchorEl={anchorElement}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        {...props}
      >
        {children}
      </MuiMenu>
    </>
  );
}
