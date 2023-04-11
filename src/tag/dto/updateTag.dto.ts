import { GroupTag } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTagDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsEnum(GroupTag)
  @IsOptional()
  group: GroupTag;
}
