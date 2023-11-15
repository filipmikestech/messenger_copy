import { ProfileImage } from "../../../../compoments/ProfileImage";
import useLocalStorage from "../../../../hooks/useLocalstorage";
import { User } from "../../../../schema";
import { ConversationActions } from "./ConversationActions";

export const ConversationHeader = () => {
  const [user] = useLocalStorage<User | null>("loginUser", null);
  return (
    <div className="h-[80px] w-full flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <ProfileImage />
        <div className=" font-bold">{user?.name}</div>
      </div>
      <ConversationActions />
    </div>
  );
};
