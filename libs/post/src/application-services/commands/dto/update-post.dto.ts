import { IPost } from "@app/post/domain";

export type UpdatePostDto = Partial<Pick<IPost, 'title' | 'message'>> 
  & Pick<IPost, 'id' | 'authorId'>