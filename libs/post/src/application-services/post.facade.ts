import { PaginationDto } from "@app/shared/dto";
import { Injectable } from "@nestjs/common";
import { CommandBus, EventBus, QueryBus } from "@nestjs/cqrs";
import { 
  CreatePostCommand, 
  CreatePostCommandHandler, 
  UpdatePostCommand, 
  UpdatePostCommandHandler, 
  DeletePostCommand, 
  DeletePostCommandHandler, 
  SetPublishedCommand, 
  SetPublishedCommandHandler 
} from "./commands";
import { CreatePostDto, UpdatePostDto } from "./commands/dto";
import { GetPostQuery, GetPostQueryHandler, GetPostsQuery, GetPostsQueryHandler } from "./queries";

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    deletePost: (id: string) => this.deletePost(id),
    setPublished: (id: string) => this.setPublishedPost(id),
  }
  queries = {
    getOnePost: (id: string) => this.getPost(id),
    getAllPosts: (pagination: PaginationDto) => this.getPosts(pagination)
  }
  events = {}

  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<
      CreatePostCommand, 
      CreatePostCommandHandler['execute']
    >(new CreatePostCommand(post))
  }
  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<
      UpdatePostCommand, 
      UpdatePostCommandHandler['execute']
    >(new UpdatePostCommand(post))
  }
  private deletePost(id: string) {
    return this.commandBus.execute<
      DeletePostCommand, 
      DeletePostCommandHandler['execute']
    >(new DeletePostCommand(id))
  }
  private setPublishedPost(id: string) {
    return this.commandBus.execute<
      SetPublishedCommand, 
      SetPublishedCommandHandler['execute']
    >(new SetPublishedCommand(id))
  }

  private getPost(id: string) {
    return this.queryBus.execute<
      GetPostQuery,
      GetPostQueryHandler['execute']
    >(new GetPostQuery(id))
  }

  private getPosts(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetPostsQuery,
      GetPostsQueryHandler['execute']
    >(new GetPostsQuery(pagination))
  }
}