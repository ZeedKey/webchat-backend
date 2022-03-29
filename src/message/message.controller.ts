import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-guard';
import { CreateMessageDto } from '../dto/create.message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessagesController {
  constructor(private messageService: MessageService) {}

  @Post()
  createMessage(@Body() userDto: CreateMessageDto) {
    return this.messageService.createMessage(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.messageService.getAllMessages();
  }
}
