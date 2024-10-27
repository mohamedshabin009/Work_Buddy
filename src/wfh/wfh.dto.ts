import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateWfhDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['APPROVED', 'REJECT', 'PENDING'])
  status: 'APPROVED' | 'REJECT' | 'PENDING' = 'PENDING';

  @IsNotEmpty()
  @IsDateString()
  created_on: Date;
}
export class UpdateWfhDto {}
