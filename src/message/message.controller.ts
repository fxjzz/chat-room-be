import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageListDto } from './dto/find-messageList.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  async create(@Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.create(createMessageDto);
  }

  @Post('list')
  findList(@Body() listDTO: MessageListDto) {
    return this.messageService.findMessageList(listDTO);
  }
}
