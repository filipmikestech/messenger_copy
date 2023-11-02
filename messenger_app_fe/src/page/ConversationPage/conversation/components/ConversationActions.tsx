import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
export const ConversationActions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton id="basic-button" onClick={handleClick}>
        <BiDotsVerticalRounded />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "actions-button",
        }}
      >
        <MenuItem onClick={handleClose}>Delete conversation</MenuItem>
      </Menu>
    </div>
  );
};
