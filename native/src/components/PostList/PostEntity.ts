export interface PostAuthor {
  id: string;
  name: string;
}

export interface PostEntity {
  id: string;
  title: string;
  body: string;
  publishedAt: Date;
  author: PostAuthor;
}
