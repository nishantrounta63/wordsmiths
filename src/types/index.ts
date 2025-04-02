
export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PostFormValues {
  title: string;
  content: string;
  author: string;
}
