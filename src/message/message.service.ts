import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<any>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    Object.assign(createMessageDto, { createAt: new Date() });
    const msg = await this.messageRepository.create(createMessageDto);
    await this.messageRepository.save(msg);
    return {
      code: 200,
      msg: '发送成功',
    };
  }

  async findMessageList(findMessageListObj) {
    const res1 = await this.messageRepository.find({
      where: {
        sender: findMessageListObj.username,
        receiver: findMessageListObj.currentChater,
      },
    });
    const res2 = await this.messageRepository.find({
      where: {
        sender: findMessageListObj.currentChater,
        receiver: findMessageListObj.username,
      },
    });
    return {
      code: '200',
      msg: '查询成功',
      data: {
        messageList: [...res1, ...res2].sort((a, b) => a.id - b.id),
      },
    };
  }
}
