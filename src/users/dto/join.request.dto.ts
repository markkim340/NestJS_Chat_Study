import { IsEmail, IsNotEmpty } from 'class-validator';

export class JoinRequestDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  public nickname: string;

  @IsNotEmpty()
  public password: string;
}
