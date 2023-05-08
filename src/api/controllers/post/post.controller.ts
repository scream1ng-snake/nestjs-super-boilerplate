import { CurrentUser, ICurrentUser } from '@app/auth';
import { PostFacade } from '@app/post/application-services';
import { Body, Controller, Post } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { CreatePostDto } from './dto';

@Controller('post')
export class PostController {
  constructor(
    private readonly postFacade: PostFacade
  ) {}

  @Post()
  createPost(
    // @CurrentUser() { userId }: ICurrentUser, todo
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: randomStringGenerator()
      // authorId: userId
    })
  }
}
