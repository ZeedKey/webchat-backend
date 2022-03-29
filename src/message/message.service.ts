import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMessageDto } from '../dto/create.message.dto';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message) private MessageRepository: typeof Message,
  ) {}

  async createMessage(messageDto: CreateMessageDto) {
    const message = await this.MessageRepository.create(messageDto);
    return message;
  }

  async getAllMessages() {
    const messages = await this.MessageRepository.findAll({
      include: { all: true },
    });
    return messages;
  }
}
