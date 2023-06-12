import { PaginationDto } from "../dto";
import { ApiProperty, ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common'

export class ResponseWithPagination<T>
  extends PaginationDto {
  @ApiProperty({ description: 'limit', type: 'number' })
  limit: number;

  @ApiProperty({ description: 'offset', type: 'number' })
  offset: number;

  @ApiProperty({ 
    description: 'total count rows in database', 
    type: 'number' 
  })
  total!: number;

  @ApiProperty({
    description: 'data array',
    default: [],
    isArray: true,
    items: {}
  })
  data: T[]
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(Response, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(Response) },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(dataDto)
                }
              }
            }
          }
        ]
      }
    })
  )
