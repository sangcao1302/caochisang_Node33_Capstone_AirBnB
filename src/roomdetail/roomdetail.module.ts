import { Module } from '@nestjs/common';
import { RoomdetailService } from './roomdetail.service';
import { RoomdetailController } from './roomdetail.controller';

@Module({
  controllers: [RoomdetailController],
  providers: [RoomdetailService],
})
export class RoomdetailModule {}
