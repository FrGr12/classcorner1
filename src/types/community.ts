
export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: string;
  topic?: string;
  category?: string;
  tags: string[];
  votes: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  post_id: number;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface PostVote {
  post_id: number;
  user_id: string;
  vote_type: -1 | 1;
  created_at: string;
}

export type PostWithComments = Post & {
  comments?: Comment[];
};
