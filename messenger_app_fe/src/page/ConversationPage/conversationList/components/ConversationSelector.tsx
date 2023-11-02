import { ProfileImage } from "../../../../compoments/ProfileImage";

export const ConversationSelector = ({ name }: { name: string }) => {
  return (
    <div className="p-3 hover:bg-hoverColor cursor-pointer flex gap-3 ">
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
