import { ProfileImage } from "../../../../compoments/ProfileImage";
import { User } from "../../../../schema";
import { ConversationActions } from "./ConversationActions";

type ConversationHeaderProps = {
  users?: User[] | null;
};

export const ConversationHeader = ({ users }: ConversationHeaderProps) => {
  return (
    <div className="h-[80px] w-full flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <ProfileImage />
        <div className=" font-bold">{users?.map((user) => user.name).join(", ")}</div>
      </div>
      <ConversationActions />
    </div>
  );
};
