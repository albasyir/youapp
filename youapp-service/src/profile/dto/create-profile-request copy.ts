import { IsOptional, IsString, IsEnum, IsDate, IsNumber, IsBase64 } from 'class-validator';

export class CreateProfileRequestDto {
  @IsOptional()
  @IsString()
  readonly displayName?: string;

  @IsOptional()
  @IsEnum(['Man', 'Woman'])
  readonly gender?: 'Man' | 'Woman';

  @IsOptional()
  @IsDate()
  readonly birthday?: Date;

  @IsOptional()
  @IsNumber()
  readonly height?: number;

  @IsOptional()
  @IsNumber()
  readonly weight?: number;

  @IsOptional()
  @IsBase64()
  readonly image?: string; // Base64 encoded image
}
