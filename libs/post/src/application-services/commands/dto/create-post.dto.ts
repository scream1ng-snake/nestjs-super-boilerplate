import { IPost } from "@app/post/domain";

export type CreatePostDto = Pick<IPost, 'title' | 'message' | 'authorId'>