import { PostAggregate } from "@app/post/domain";
import { PostRepository } from "@app/post/providers";
import { BadRequestException, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePostCommand } from "./update-post.command";

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler 
  implements ICommandHandler <UpdatePostCommand, PostAggregate> {
  private readonly logger = new Logger(UpdatePostCommandHandler.name); 
  constructor(
    private readonly postRepository: PostRepository,
  ) {}
  async execute({ post }: UpdatePostCommand): Promise<PostAggregate> {
    const existsPost = await this.postRepository
      .findOne(post.id)
      .catch((err) => {
        this.logger.error(err);
        return null as PostAggregate;
      })
    if (!existsPost) {
      throw new BadRequestException(`Post by id ${post.id} not found`)
    }
    Object.assign(existsPost, post)
    const postAggregate = PostAggregate.create(existsPost);
    postAggregate.plainToInstance();
    await this.postRepository.save(postAggregate);
    return postAggregate;
  }
}