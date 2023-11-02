import { ProfileImage } from "../../../../compoments/ProfileImage";
import { ConversationActions } from "./ConversationActions";

export const ConversationHeader = () => {
  return (
    <div className="h-[80px] w-full flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <ProfileImage />
        <div className=" font-bold">User1</div>
      </div>
      <ConversationActions />
    </div>
  );
};
