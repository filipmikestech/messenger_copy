import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCreateOutline } from "react-icons/io5";
export const ConversationHeader = () => {
  const [inputText, setInputText] = useState("");
  return (
    <div className="h-[150px] flex flex-col justify-end p-3">
      <div className="flex h-full items-center">
        <div className="flex-1 flex justify-start items-center">
          <div className="w-[35px] rounded-full border-[1px] border-solid border-[#202e24] p-1">
            <img src="/images/no-profile-img.png" />
          </div>
        </div>
        <div className="flex-1 flex justify-center font-bold text-xl items-center">Messenger</div>
        <div className="flex-1 flex justify-end items-center">
          <div className="w-[35px] h-[35px] rounded-full bg-[#e7e7e6] flex justify-center items-center">
            <IoCreateOutline style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>
      <span className="relative">
        <input
          className=" px-4 py-1 w-full bg-[#e3e3e3] text-black placeholder:text-[#8d8d8c]"
          placeholder="Search"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <span className=" absolute right-3 top-1/2 -translate-y-1/2 text-[#8d8d8c]">
          <AiOutlineSearch />
        </span>
      </span>
    </div>
  );
};
