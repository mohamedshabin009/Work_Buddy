import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

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
  @IsEnum(['APPROVED', 'REJECT', 'PENDING'])
  status: 'APPROVED' | 'REJECT' | 'PENDING' = 'PENDING';

  created_At: Date;
}

export class UpdateLeaveDto {}
