import { UpdatePostDto as IUpdatePostDto } from "@app/post/application-services/commands/dto";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdatePostDto implements IUpdatePostDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  message?: string;
  
  @IsUUID()
  authorId: string;
}