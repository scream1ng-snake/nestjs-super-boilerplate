import { IPost } from "./post.interface";
import { PostServices } from "./services";
import { IsUUID, IsString, IsNotEmpty, IsBoolean, validateSync } from "class-validator";
import { Exclude } from "class-transformer";
import { DomainError } from "@app/errors";
import { v4 as uuidv4 } from 'uuid';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = uuidv4();

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsBoolean()
  @Exclude()
  isPublished = false;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();
    _post.setNotPublished();

    _post.updatedAt = post?.id
      ? new Date().toISOString()
      : _post.updatedAt
    
    Object.assign(_post, post);
    const errors = validateSync(_post);

    if(errors.length) {
      throw new DomainError(errors, 'Пост не валидный')
    }
    return _post;
  }
}