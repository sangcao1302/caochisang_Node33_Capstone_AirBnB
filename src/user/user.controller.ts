import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors,UploadedFile ,Put, Headers} from '@nestjs/common';
import { UserService } from './user.service';
import { get } from 'http';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateUser } from './dto/user.dto';

@ApiTags("User")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  getUser(@Headers("token") headers:string){
   return this.userService.getUser(headers)
  }

  @Delete(":id")
  delUser(@Param("id") id:number,@Headers("token") headers:string){
    return this.userService.delUser(id,headers)
  }
  @Get("pagination/:pageIndex/:pageSize")
  getPageUser(@Param("pageIndex") pageIndex:number,@Param("pageSize") pageSize:number,@Headers("token") headers:string){
    return this.userService.getPageUser(pageIndex,pageSize,headers)
  }
  @Get(":id")
  getUserId(@Param("id") id:number,@Headers("token") headers:string){
    return this.userService.getUserId(id,headers)
  }
  @ApiConsumes('multipart/form-data')
  @Put(":id")
  @UseInterceptors(
    FileInterceptor("anh_dai_dien",
    {
      storage:diskStorage({
        destination:process.cwd()+"/public/img",
        filename:(req,file,callback)=>callback(null,new Date().getTime()+ "_" +file.originalname)
      })
    })
  )
  updateUser(@Body() body:UpdateUser,@Param("id") id:number,@UploadedFile() anh_dai_dien:Express.Multer.File,@Headers("token") headers:string) {
    return this.userService.updateUser(body,id,anh_dai_dien.filename,headers)
  } 
  @Get("search/:userName")
  getUserName(@Param("userName") userName:string,@Headers("token") headers:string){
    return this.userService.getUserName(userName,headers)
  }

}
