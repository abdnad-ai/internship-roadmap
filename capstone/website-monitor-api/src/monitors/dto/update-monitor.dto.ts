import {
  IsUrl,
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class UpdateMonitorDto {
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsIn(['webpage', 'api'])
  @IsOptional()
  sourceType?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  condition?: string;

  @IsBoolean()
  @IsOptional()
  notifyByEmail?: boolean;

  @IsIn(['active', 'paused'])
  @IsOptional()
  status?: string;
}
