export type Post = {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: Date;
  categories: string[];
  content: string;
}