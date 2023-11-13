export const ProfileImage = ({ size = "40px" }: { size?: string }) => {
  return (
    <div style={{ width: size, height: size }} className={` rounded-full border-[1px] flex-shrink-0 border-solid border-darkTextColor p-2`}>
      <img src="/images/no-profile-img.png" />
    </div>
  );
};
