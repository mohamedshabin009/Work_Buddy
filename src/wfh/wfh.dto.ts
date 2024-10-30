import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Status {
  'APPROVED' = 'APPROVED',
  'REJECT' = 'REJECT',
  'PENDING' = 'PENDING',
}
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

  @IsOptional()
  @IsString()
  @IsEnum(Status, {
    message: "You can select Only 'APPROVED','PENDING',REJECT'",
  })
  status?: string;

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
