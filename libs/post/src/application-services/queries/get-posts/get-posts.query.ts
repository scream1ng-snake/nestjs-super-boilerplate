import { PaginationDto } from "@app/shared/dto";

export class GetPostsQuery {
  constructor(
    public readonly pagination: PaginationDto
  ) {}
}