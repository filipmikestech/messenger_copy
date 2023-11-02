export const ProfileImage = ({ size = "40px" }: { size?: string }) => {
  return (
    <div className={`w-[${size}] h-[${size}] rounded-full border-[1px] border-solid border-darkTextColor p-2`}>
      <img src="/images/no-profile-img.png" />
    </div>
  );
};
