import type { commentData } from '../components/CommentCard';

const comments = [
  {
    id: 1,
    username: 'Jerald Estrella',
    avatar: '',
    rating: 5,
    comment: 'Excellent sound quality.',
    date: '2026-06-25',
    replyTo: null,
  },
  {
    id: 2,
    username: 'Maria Santos',
    avatar: '',
    rating: 4,
    comment: 'I agree. The bass is impressive.',
    date: '2026-06-25',
    replyTo: 1,
  },
  {
    id: 3,
    username: 'John Cruz',
    avatar: '',
    rating: 5,
    comment: 'How is the battery life?',
    date: '2026-06-25',
    replyTo: 1,
  },
  {
    id: 4,
    username: 'Jerald Estrella',
    avatar: '',
    rating: 5,
    comment: 'Around 30 hours on a full charge.',
    date: '2026-06-25',
    replyTo: 3,
  },
  {
    id: 5,
    username: 'Anna Reyes',
    avatar: '',
    rating: 3,
    comment: 'The ear cups are a bit small.',
    date: '2026-06-24',
    replyTo: null,
  },
];

const mapComments = new Array();
export const threadedComments: commentData[] = [];

comments.forEach((com) => {
  mapComments.push({ ...com, children: [] });
});

mapComments.forEach((comment) => {
  if (comment.replyTo) {
    const parentIndex = mapComments.findIndex((c) => c.id === comment.replyTo);

    if (parentIndex !== -1) {
      mapComments[parentIndex].children.push(comment);
    }
  } else {
    threadedComments.push(comment);
  }
});
