export const ConversationSelector = ({ name }: { name: string }) => {
  return (
    <div className="p-3 hover:bg-[#e3e3e3] cursor-pointer flex gap-3 ">
      <div className="w-[60px] rounded-full border-[1px] border-solid border-[#202e24] p-2">
        <img src="/images/no-profile-img.png" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="  font-semibold">{name}</div>
        <div className=" text-[14px] text-[#919191]">
          Beginning of last message · <span>14m</span>
        </div>
      </div>
    </div>
  );
};
