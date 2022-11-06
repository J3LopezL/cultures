import {IsNotEmpty, IsString, IsNumber, IsDateString} from 'class-validator';

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stars: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

 @IsDateString()
 @IsNotEmpty()
 readonly dateStars: Date;
}
