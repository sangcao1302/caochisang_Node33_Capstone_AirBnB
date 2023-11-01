import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { RoomdetailModule } from './roomdetail/roomdetail.module';
import { LocationModule } from './location/location.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [AuthModule,ConfigModule.forRoot({ isGlobal: true }), CommentModule, RoomModule, UserModule, RoomdetailModule, LocationModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
