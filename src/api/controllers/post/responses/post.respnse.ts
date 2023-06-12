import { IPost } from "@app/post";
import { ApiProperty } from '@nestjs/swagger'

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({
    description: 'unique post id (uuid)',
    type: 'string'
  })
  id: string;

  @ApiProperty({
    description: 'post title',
    type: 'string'
  })
  title: string;
  
  @ApiProperty({
    description: 'post message',
    type: 'string'
  })
  message: string;

  @ApiProperty({
    description: 'post authorId uuid',
    type: 'string'
  })
  authorId: string;

  @ApiProperty({
    description: 'post creation date',
    type: 'string',
    example: new Date().toISOString()
  })
  createdAt: string;

  @ApiProperty({
    description: 'post updating date',
    type: 'string',
    example: new Date().toISOString()
  })
  updatedAt: string;
}