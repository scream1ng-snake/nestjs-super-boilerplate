import { PostFacade } from '@app/post/application-services';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { PostResponse } from '../responses/post.response';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(
    private readonly postFacade: PostFacade
  ) {}

  @Query(() => PostResponse, { name: 'post' })
  async getPostByID(
    @Args('id') id: string
  ) {
    return await this.postFacade.queries.getOnePost(id);
  }
}
