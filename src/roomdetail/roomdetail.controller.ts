import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Put, Headers } from '@nestjs/common';
import { RoomdetailService } from './roomdetail.service';

import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PostRoomDetail, UpdateRoomDetail } from './dto/roomDetail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateBookRoomDto } from 'src/room/dto/room.dto';
@ApiTags("Room")
@Controller('roomdetail')
export class RoomdetailController {
  constructor(private readonly roomdetailService: RoomdetailService) {}

@Get("")
getRoom(@Headers("token") headers:string){
  return this.roomdetailService.getRoom(headers)
}

@Get("location/:id")
getRoomLocation(@Param("id") id:number,@Headers("token") headers:string){
  return this.roomdetailService.getRoomLocation(id,headers)
}
@Get(":id")
getRoomById(@Param("id") id:number,@Headers("token") headers:string){
  return this.roomdetailService.getRoomById(id,headers)
}
@Get("pagination/:pageSize/:pageIndex")
getPage(@Param("pageSize") pageSize:number,@Param("pageIndex") pageIndex:number,@Headers("token") headers:string ){
  return this.roomdetailService.getPage(pageSize,pageIndex,headers)
}
@Delete("delete/room/:id")
delRoom(@Param("id") id:number,@Headers("token") headers:string){
  return this.roomdetailService.delRoom(id,headers)
}
@ApiConsumes('multipart/form-data')
@Post()
@UseInterceptors(
  FileInterceptor("hinh_anh",
  {
    storage:diskStorage({
      destination:process.cwd()+"/public/img/room",
      filename:(req,file,callback)=>callback(null, new Date().getTime()+"_"+file.originalname)
    })
  }
  )
)
postRoom(@Body() body:PostRoomDetail,@UploadedFile() hinh_anh:Express.Multer.File,@Headers("token") headers:string){
return this.roomdetailService.postRoom(body,hinh_anh.filename,headers)
 
}
@ApiConsumes('multipart/form-data')
@Put(":id")
@UseInterceptors(
  FileInterceptor("hinh_anh",
  {
    storage:diskStorage({
      destination:process.cwd()+"/public/img/room",
      filename:(req,file,callback)=>callback(null, new Date().getTime()+"_"+file.originalname)
    })
  }
  )
)
updateRoomDetail(@Body() body:UpdateRoomDetail,@Param("id") id:number,@UploadedFile() hinh_anh:Express.Multer.File,@Headers("token") headers:string){
  return this.roomdetailService.updateRoomDetail(body,id,hinh_anh.filename,headers)
}

}
