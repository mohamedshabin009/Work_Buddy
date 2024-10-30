import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
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
export class Filter {
  @IsNotEmpty()
  @IsNumberString()
  id: number;
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
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ClockEvent)
  clockEvent?: ClockEvent[];
}
