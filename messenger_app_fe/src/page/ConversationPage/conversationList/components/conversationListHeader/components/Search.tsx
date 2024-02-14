import { AiOutlineSearch } from "react-icons/ai";
import { useAppStore } from "../../../../../../store/useStore";

export const Search = () => {
  const filteredConversation = useAppStore((state) => state.filteredConversation);
  const setFilteredConversation = useAppStore((state) => state.setFilteredConversation);
  return (
    <span className="relative">
      <input
        className=" px-4 py-1 w-full focus:outline-none bg-inputBgColor text-darkTextColor placeholder:text-lightTextColor"
        placeholder="Search"
        value={filteredConversation}
        onChange={(e) => setFilteredConversation(e.target.value)}
      />
      <span className=" absolute right-3 top-1/2 -translate-y-1/2 text-lightTextColor">
        <AiOutlineSearch />
      </span>
    </span>
  );
};
