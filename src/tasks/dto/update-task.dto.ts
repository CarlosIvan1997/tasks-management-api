import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  @IsOptional()
  readonly isCompleted?: boolean;
}
