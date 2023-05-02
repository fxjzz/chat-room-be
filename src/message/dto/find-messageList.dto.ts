import { IsString } from 'class-validator';

export class MessageListDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly currentChater: string;
}
