import { ProfileImage } from "../../../../compoments/ProfileImage";
import { api } from "../../../../utils/axiosIntance";

export const ConversationSelector = ({ name, conversationId }: { name: string; conversationId: string }) => {
  return (
    <div
      className="p-3 hover:bg-hoverColor cursor-pointer flex gap-3 "
      onClick={async () => {
        const { data } = await api.post("/messages", { conversationId: conversationId });
        console.log(data);
      }}
    >
      <ProfileImage size="60px" />
      <div className="flex flex-col justify-center">
        <div className="  font-semibold">{name}</div>
        <div className=" text-[14px] text-lightTextColor">
          Beginning of last message · <span>14m</span>
        </div>
      </div>
    </div>
  );
};
