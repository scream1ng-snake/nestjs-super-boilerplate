import { 
  CreatePostDto as ICreatePostDto
} from "@app/post/application-services/commands/dto";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePostDto implements ICreatePostDto {
  @ApiProperty({ description: 'post title', type: 'string'})
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ description: 'post message', type: 'string'})
  @IsString()
  @IsNotEmpty()
  message: string;
  @ApiProperty({ description: 'post authorId uuid', type: 'string'})
  @IsUUID()
  authorId: string;
}