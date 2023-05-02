import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  readonly sender: string;

  @IsString()
  readonly receiver: string;

  @IsString()
  readonly content: string;
}
