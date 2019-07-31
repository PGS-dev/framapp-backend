import { IsEmail, IsString, MinLength } from 'class-validator';

class RegisterDto {
  @MinLength(5, {
    message: 'Password is too short',
  })
  public password: string;

  @IsEmail()
  public email: string;

  @IsString()
  public name: string;

  @IsString()
  public surname: string;
}

export default RegisterDto;
