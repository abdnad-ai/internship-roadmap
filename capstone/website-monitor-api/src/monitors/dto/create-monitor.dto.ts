import {
  IsUrl,
  IsString,
  IsNotEmpty,
  IsIn,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateMonitorDto {
  @IsUrl()
  url: string;

  @IsIn(['webpage', 'api'])
  @IsOptional()
  sourceType?: string;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsBoolean()
  @IsOptional()
  notifyByEmail?: boolean;
}
