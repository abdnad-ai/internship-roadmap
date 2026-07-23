import { IsBooleanString, IsIn, IsOptional, IsString } from 'class-validator';

export class QueryTaskDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsBooleanString()
  @IsOptional()
  completed?: string;

  @IsIn(['title', 'createdAt', 'completed'])
  @IsOptional()
  sort?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: string;

  @IsOptional()
  page?: string;

  @IsOptional()
  limit?: string;
}
