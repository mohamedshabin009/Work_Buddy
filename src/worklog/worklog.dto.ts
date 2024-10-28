import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class ClockEvent {
  @IsNotEmpty()
  @IsDateString()
  clock_in_time: Date;

  @IsNotEmpty()
  @IsDateString()
  clock_out_time: Date;
}

export class CreateWorkLogDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClockEvent)
  clockEvent: ClockEvent[];
}
export class UpdateWorkLogDto {
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClockEvent)
  clockEvent?: ClockEvent[];
}
