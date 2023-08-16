import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty()
  @IsString()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  url: string;

  @ApiProperty()
  @IsString()
  @IsUrl(undefined, { message: 'Short URL is not valid.' })
  shortUrl: string;
}
