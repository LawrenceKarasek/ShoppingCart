import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  original: string;
}

export class UpdateUrlDto {
  @IsUrl()
  original?: string;

  @IsString()
  short?: string;

  @IsString()
  hits?: number;
}