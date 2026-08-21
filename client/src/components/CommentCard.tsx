import UserAvatar from './UserAvatar';

export interface commentData {
  id: number;
  username: string;
  avatar: string;
  comment: string;
  date: string;
  children?: commentData[];
}

const Comment = ({ comment }: { comment: commentData }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-3'>
        <UserAvatar avatar={comment.avatar} username={comment.username} />

        <div className='flex flex-col gap-1 flex-1'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-semibold text-neutral-900 dark:text-neutral-100'>
              {comment.username}
            </p>
            {comment.date && (
              <span className='text-[11px] text-neutral-400'>
                {comment.date}
              </span>
            )}
          </div>
          <div className='bg-neutral-100 dark:bg-neutral-800 rounded-2xl rounded-tl-none px-4 py-3'>
            <p className='text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed'>
              {comment.comment}
            </p>
          </div>
        </div>
      </div>

      {comment.children && comment.children.length > 0 && (
        <div className='flex flex-col gap-3 ml-4 border-l border-neutral-200 dark:border-neutral-700 pl-4'>
          {comment.children.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
