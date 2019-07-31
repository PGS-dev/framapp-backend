import { IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

class PostProductDto {
  @MinLength(2, {
    message: 'Title is too short',
  })
  public title: string;

  @IsString()
  public description: string;

  @IsNumber()
  public amount: number;

  @IsString()
  @MinLength(1, {
    message: 'Need to provide price',
  })
  public price: string;

  @IsBoolean()
  public promoted: boolean;

  @IsString()
  public categoryId: string;

  @IsString()
  public imageUrl: string;
}

export default PostProductDto;
