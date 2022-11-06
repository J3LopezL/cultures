import { IsNotEmpty, IsString } from 'class-validator';

export class CityDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly climate: string;
}
