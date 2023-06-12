import { IPost } from "@app/post";
import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, { description: 'unique id of post' })
  id: string;
  @Field({ description: 'title of post' })
  title: string;
  @Field({ description: 'message of post' })
  message: string;
  @Field({ description: 'authorId of post' })
  authorId: string;
  @Field({ description: 'createdAt of post' })
  createdAt: string;
  @Field({ description: 'updatedAt of post' })
  updatedAt: string;
}