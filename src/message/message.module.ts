import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { MessagesController } from './message.controller';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Module({
  controllers: [MessagesController],
  providers: [MessageService],
  imports: [SequelizeModule.forFeature([Message]), forwardRef(() => AuthModule)],
  exports: [MessageService],
})
export class MessageModule {}
