import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ProfileImage } from "../../../../../compoments/ProfileImage";
import useLocalStorage from "../../../../../hooks/useLocalstorage";
import { User } from "../../../../../schema";
import { CreateNewConversationModal } from "./components/CreateNewConversationModal";
import { Search } from "./components/Search";
export const ConversationListHeader = () => {
  const [loggedInUser] = useLocalStorage<User | null>("loginUser", null);
  const [openCreateNewConversationModal, setOpenCreateNewConversationModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const openConversation = () => {
    setOpenCreateNewConversationModal(true);
  };
  const handleClickLogout = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("loginUser");
    navigate("/login");
  };

  return (
    <div className="h-[150px] flex flex-col justify-end p-3">
      <div className="flex h-full items-center">
        <div id="basic-button" onClick={handleClickLogout} className="flex-1 cursor-pointer flex gap-3 justify-start items-center">
          <ProfileImage size="35px" />
          <div className=" font-bold">{loggedInUser?.name}</div>
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleCloseLogout}
          MenuListProps={{
            "aria-labelledby": "actions-button",
          }}
        >
          <MenuItem onClick={handleCloseLogout}>Log out</MenuItem>
        </Menu>
        <div className="flex-1 flex justify-center font-bold text-xl items-center text-darkTextColor">Messenger</div>
        <div className="flex-1 flex justify-end items-center">
          <div onClick={openConversation} className="w-[35px] h-[35px] rounded-full bg-inputBgColor flex justify-center items-center">
            <IoCreateOutline style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
      <Search />
      <CreateNewConversationModal open={openCreateNewConversationModal} handleClose={() => setOpenCreateNewConversationModal(false)} />
    </div>
  );
};
