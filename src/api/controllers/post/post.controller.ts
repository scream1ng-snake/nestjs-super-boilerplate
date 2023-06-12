import { CurrentUser, ICurrentUser, Public } from '@app/auth';
import { JwtGuard } from '@app/auth/guards';
import { PostAggregate } from '@app/post';
import { PostFacade } from '@app/post/application-services';
import { ApiOkResponsePaginated, ResponseWithPagination } from '@app/shared';
import { PaginationDto } from '@app/shared/dto';
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostResponse } from './responses';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(
    private readonly postFacade: PostFacade
  ) { }

  @ApiOperation({ summary: 'Create post' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
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

  @ApiOperation({ summary: 'get post by id' })
  @ApiResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  getOnePost(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.postFacade.queries.getOnePost(id);
  }

  @ApiOperation({ summary: 'get all posts' })
  @ApiOkResponsePaginated(ResponseWithPagination<PostResponse>)
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

  @ApiOperation({ summary: 'update post' })
  @ApiResponse({ type: PostResponse })
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

  @ApiOperation({ summary: 'set post published' })
  @ApiResponse({ type: PostResponse })
  @Patch(':id')
  async setPublished(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.postFacade.commands.setPublished(id);
  }

  @ApiOperation({ summary: 'delete post' })
  @ApiResponse({ type: Boolean })
  @Delete(':id')
  async deletePost(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.postFacade.commands.deletePost(id)
  }
}
