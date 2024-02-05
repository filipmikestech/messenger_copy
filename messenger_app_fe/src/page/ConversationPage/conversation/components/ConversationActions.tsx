import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { ConversationService } from "../conversation.service";
export const ConversationActions = () => {
  const { conversationId } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteConversation = () => {
    if (conversationId) {
      ConversationService.deleteConversation(conversationId);
    }
    handleClose();
    navigate("/");
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
        <MenuItem onClick={deleteConversation}>Delete conversation</MenuItem>
      </Menu>
    </div>
  );
};
