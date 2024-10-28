import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['SICK', 'CASUAL'])
  leaveType: 'SICK' | 'CASUAL';

  @IsString()
  @IsNotEmpty()
  @IsEnum(['APPROVED', 'REJECT', 'PENDING'], {
    message: "You can select Only 'APPROVED','REJECT'",
  })
  status: 'APPROVED' | 'REJECT' | 'PENDING' = 'PENDING';

  created_At: Date;
}

export class UpdateLeaveDto {
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsEnum(['SICK', 'CASUAL'], {
    message: "You can choose Only 'SICK' or 'CASUAL'",
  })
  @IsNotEmpty()
  @IsOptional()
  leaveType?: 'SICK' | 'CASUAL';
}
