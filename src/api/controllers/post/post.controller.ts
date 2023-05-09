import { CurrentUser, ICurrentUser, Public } from '@app/auth';
import { JwtGuard } from '@app/auth/guards';
import { PostAggregate } from '@app/post';
import { PostFacade } from '@app/post/application-services';
import { ResponseWithPagination } from '@app/shared';
import { PaginationDto } from '@app/shared/dto';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostDto, UpdatePostDto } from './dto';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(
    private readonly postFacade: PostFacade
  ) { }

  @Post()
  createPost(
    // @CurrentUser() { userId }: ICurrentUser, todo
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: uuidv4()
      // authorId: userId
    })
  }

  @Public()
  @Get(':id')
  getOnePost(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.postFacade.queries.getOnePost(id);
  }

  @Public()
  @Get()
  async getAllPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(
      PaginationDto,
      paginationDto
    )
    // @ts-ignore
    const [data, count] = await this.postFacade.queries.getAllPosts(pagination);
    return {
      ...pagination,
      data,
      total: count
    }
  }

  @Put()
  async updatePost(
    @CurrentUser() user: ICurrentUser,
    @Body() updatePost: UpdatePostDto
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePost,
      authorId: user.userId
    })
  }

  @Patch(':id')
  async setPublished(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.postFacade.commands.setPublished(id);
  }

  @Delete(':id')
  async deletePost(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.postFacade.commands.deletePost(id)
  }
}
