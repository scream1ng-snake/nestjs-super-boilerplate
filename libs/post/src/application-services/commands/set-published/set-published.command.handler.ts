import { PostAggregate } from "@app/post/domain";
import { PostRepository } from "@app/post/providers";
import { BadRequestException, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SetPublishedCommand } from "./set-published.command";

@CommandHandler(SetPublishedCommand)
export class SetPublishedCommandHandler 
  implements ICommandHandler<SetPublishedCommand, PostAggregate> {
  private readonly logger = new Logger(SetPublishedCommandHandler.name)

  constructor(
    private readonly postRepository: PostRepository
  ) { }
  
  async execute({ id }: SetPublishedCommand): Promise<PostAggregate> {
    const existsPost = await this.postRepository
      .findOne(id)
      .catch((err) => {
        this.logger.error(err);
        return null as PostAggregate;
      })
    if (!existsPost) {
      throw new BadRequestException(`Post by id ${id} not found`)
    }
    const postAggregate = PostAggregate.create(existsPost);
    postAggregate.setPublished();
    await this.postRepository.save(postAggregate);
    return postAggregate;
  }

}