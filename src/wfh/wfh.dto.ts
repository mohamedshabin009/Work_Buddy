import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsEnum(['APPROVED', 'REJECT', 'PENDING'], {
    message: "You can select Only 'APPROVED','REJECT'",
  })
  status: 'APPROVED' | 'REJECT' | 'PENDING' = 'PENDING';

  created_on: Date;
}
export class UpdateWfhDto {
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsString()
  reason?: string;
}
