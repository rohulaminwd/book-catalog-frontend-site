

const UserProfileImg = ({ me, className, textColor }: any) => {
  return (
    <div
      className={`${className} font-reem rounded-full flex items-center justify-center ring  ring-offset-base-100 ring-offset-2`}
    >
      <h2
        className={`${textColor ? textColor : 'text-xl text-white'
          } uppercase font-bold `}
      >
        {me?.name?.firstName?.slice(0, 1)}
        {me?.name?.lastName?.slice(0, 1)}
      </h2>
    </div>
  );
};

export default UserProfileImg;
