import { PostEntity } from "@app/entities";
import { PaginationDto } from "@app/shared/dto";
import { Injectable, Logger } from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { FindManyOptions, Repository } from "typeorm";
import { IPost, PostAggregate } from "../domain";
import { PostRepository } from "./post.repository";

@Injectable()
export class PostAdapter implements PostRepository {
  private readonly logger = new Logger(PostAdapter.name)

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) { }

  async save(post: IPost): Promise<PostAggregate> {
    const existsPost = await this.findOne(post.id);
    if (existsPost) {
      const { id, ...toUpdate } = post;
      await this.postRepository.update({ id }, toUpdate);
      return this.findOne(post.id);
    }
    const savedPost = await this.postRepository.save(post);
    return PostAggregate.create(savedPost);
  }

  async findOne(id: string): Promise<PostAggregate | null> {
    const existsPost = await this.postRepository
      .findOneBy({ id })
      .catch((err) => {
        this.logger.error(err);
        return null;
      })
    if (!existsPost) {
      return null
      // throw new BadRequestException(`Post by id ${id} not found`)
    }
    return PostAggregate.create(existsPost);
  }

  async findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]> {
    const { limit: take, offset: skip } = plainToInstance(
      PaginationDto,
      pagination
    )
    const options: FindManyOptions<PostEntity> = {
      where: { isPublished: true },
      order: { createdAt: 'DESC' },
      take,
      skip,
    }
    const [data, count] = await this.postRepository
      .findAndCount(options)
      .catch(err => {
        this.logger.error(err)
        return [[], 0] as [PostEntity[], number]
      })
    return [
      data.map(post => PostAggregate.create(post)),
      count
    ]
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.postRepository
      .delete({ id })
      .catch(err => {
        this.logger.error(err);
        return false;
      });
    return !!result;
  }
}