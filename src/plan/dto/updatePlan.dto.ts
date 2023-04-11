import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdatePlanDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  saveAmount?: number;
}
