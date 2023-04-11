import { GroupTag } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDTO {
  @IsString()
  // @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  icon: string;

  @IsEnum(GroupTag)
  @IsNotEmpty()
  group: GroupTag;
}
