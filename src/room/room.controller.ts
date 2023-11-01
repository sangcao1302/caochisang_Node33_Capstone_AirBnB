import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Headers } from '@nestjs/common';
import { RoomService } from './room.service';

import { PostRoomDto, UpdateBookRoomDto } from './dto/room.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Book Room")
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

 
  @Post("bookroom")
  postRoom(@Body() body:PostRoomDto, @Headers("token") headers:string){
    return this.roomService.postRoom(body,headers)
  }
  @Get("")
  getAllRoom(@Headers("token") headers:string){
    return this.roomService.getAllRoom(headers)
  }
  @Get("bookRoom/:id")
  getRoomId(@Param("id") id:number,@Headers("token") headers:string){
    return this.roomService.getRoomId(id,headers)
  }
  @Get("book-room/:userid")
  getRoomByUserId(@Param("userid") userid:number,@Headers("token") headers:string){
    return this.roomService.getRoomByUserId(userid,headers)
  }

  @Put("/update-book-room/:id")
  updateBookRoom(@Body() body:UpdateBookRoomDto,@Param("id") id:number,@Headers("token") headers:string){
    return this.roomService.updateBookRoom(body,id,headers)
  }

  @Delete("delete-room/:id")
  deleteRoom(@Param("id") id:number,@Headers("token") headers:string){
    return this.roomService.deleteRoom(id,headers)
  }

}
