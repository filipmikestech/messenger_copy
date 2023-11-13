import { IoCreateOutline } from "react-icons/io5";
import { ProfileImage } from "../../../../../compoments/ProfileImage";
import { Search } from "./components/Search";
export const ConversationListHeader = () => {
  return (
    <div className="h-[150px] flex flex-col justify-end p-3">
      <div className="flex h-full items-center">
        <div className="flex-1 flex justify-start items-center">
          <ProfileImage size="35px" />
        </div>
        <div className="flex-1 flex justify-center font-bold text-xl items-center text-darkTextColor">Messenger</div>
        <div className="flex-1 flex justify-end items-center">
          <div className="w-[35px] h-[35px] rounded-full bg-inputBgColor flex justify-center items-center">
            <IoCreateOutline style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
};
