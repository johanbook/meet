import { FC, ReactElement, ReactNode, SyntheticEvent, useState } from "react";

import MuiMenu, { MenuProps as MuiMenuProps } from "@mui/material/Menu";

interface MenuProps extends Omit<MuiMenuProps, "open"> {
  Button: FC<{ onClick: (event: SyntheticEvent) => void }>;
  children: ReactNode;
}

export function Menu({ Button, children, ...props }: MenuProps): ReactElement {
  const [anchorEl, setAnchorEl] = useState<Element | undefined>();
  const open = Boolean(anchorEl);

  function handleClick(event: React.SyntheticEvent) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    /* eslint-disable-next-line unicorn/no-useless-undefined */
    setAnchorEl(undefined);
  }

  return (
    <>
      <Button onClick={handleClick} />

      <MuiMenu
        anchorEl={anchorEl}
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
