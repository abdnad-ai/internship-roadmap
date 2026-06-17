import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @MinLength(2, { message: "Name must be at least 2 characters" })
  name: string;

  @IsEmail({}, { message: "Enter a valid email" })
  email: string;

  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  password: string;
}