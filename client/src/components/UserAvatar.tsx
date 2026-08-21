const UserAvatar = ({
  avatar,
  username,
}: {
  avatar?: string | undefined;
  username: string;
}) => {
  return (
    <div>
      {avatar ? (
        <img
          src={avatar}
          className='w-8 h-8 rounded-full object-cover shrink-0'
          alt={username}
        />
      ) : (
        <div className='w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-semibold shrink-0'>
          {username
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
