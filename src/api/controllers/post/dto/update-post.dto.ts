import { UpdatePostDto as IUpdatePostDto } from "@app/post/application-services/commands/dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist/decorators";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdatePostDto implements IUpdatePostDto {
  @ApiProperty({ description: 'post id required', type: 'string'})
  @IsUUID()
  id: string;

  @ApiPropertyOptional({ description: 'post title', type: 'string'})
  @IsOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'post message', type: 'string'})
  @IsOptional()
  @IsString()
  @IsOptional()
  message?: string;
  
  @ApiProperty({ description: 'post author uuid', type: 'string'})
  @IsUUID()
  authorId: string;
}