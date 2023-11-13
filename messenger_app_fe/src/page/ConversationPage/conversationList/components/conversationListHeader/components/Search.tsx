import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const Search = () => {
  const [inputText, setInputText] = useState("");
  return (
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
  );
};
