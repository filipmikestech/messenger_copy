import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
export const ConversationHeader = () => {
  const [inputText, setInputText] = useState("");
  return (
    <div className="h-[150px] flex flex-col justify-end p-3">
      <div className="flex h-full items-center">
        <div className="flex-1 flex justify-start items-center">
          <div className="w-[35px] rounded-full border-[1px] border-solid border-darkTextColor p-1">
            <img src="/images/no-profile-img.png" />
          </div>
        </div>
        <div className="flex-1 flex justify-center font-bold text-xl items-center text-darkTextColor">Messenger</div>
        <div className="flex-1 flex justify-end items-center">
          <div className="w-[35px] h-[35px] rounded-full bg-inputBgColor flex justify-center items-center">
            <IoCreateOutline style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
      <span className="relative">
        <input
          className=" px-4 py-1 w-full focus:outline-none bg-inputBgColor text-darkTextColor placeholder:text-lightTextColor"
          placeholder="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <span className=" absolute right-3 top-1/2 -translate-y-1/2 text-lightTextColor">
          <AiOutlineSearch />
        </span>
      </span>
    </div>
  );
};
