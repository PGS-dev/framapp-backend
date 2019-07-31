import { IsString, MinLength } from 'class-validator';

class PostCategoryDto {
  @MinLength(2, {
    message: 'Title is too short',
  })
  public title: string;

  @IsString()
  public description: string;
}

export default PostCategoryDto;
