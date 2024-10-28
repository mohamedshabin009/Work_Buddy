import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['EMPLOYEE', 'MANAGER'])
  role: 'EMPLOYEE' | 'MANAGER';

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  profileImage: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsPhoneNumber()
  mobileNumber?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}
