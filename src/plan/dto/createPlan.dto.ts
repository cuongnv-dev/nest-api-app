import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreatePlanDTO {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  saveAmount?: number;
}
