import { Controller, Get, Post, Body, Patch, Param, Delete,UseInterceptors ,UploadedFile,Put,Headers} from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PostImgLocation, PostLocation, UpdateLocation } from './dto/location.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags("Vị trí")
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}



  @Get("")
  getLocation(@Headers("token") headers:string) {
    return this.locationService.getLocation(headers);
  }

  @Get(':id')
  getLocationId(@Param('id') id:number,@Headers("token") headers:string) {
    return this.locationService.getLocationId(+id,headers);
  }

  @Get("pagination/:pageSize/:pageIndex")
  getPage(@Param("pageSize") pageSize:number,@Param("pageIndex") pageIndex:number,@Headers("token") headers:string){
    return this.locationService.getPage(pageSize,pageIndex,headers)
  }
  @ApiConsumes('multipart/form-data')
  @Post()
  @UseInterceptors(
    FileInterceptor("hinh_anh",{
      storage:diskStorage({
        destination:process.cwd()+"/public/img/location",
        filename:(req,file,callback)=>callback(null,new Date().getTime() + "_" + file.originalname)
      })
    })
  )
  postLocation(@Body() body:PostLocation,@UploadedFile() hinh_anh:Express.Multer.File,@Headers("token") headers:string){
    return this.locationService.postLocation(body,hinh_anh.filename,headers)
  }

  @Put(":id")
  updateLocation(@Param("id") id:number,@Body() body:UpdateLocation,@Headers("token") headers:string){
    return this.locationService.updateLocation(id,body,headers)
  }
  @ApiConsumes('multipart/form-data')
  @Post('hinhanh/:id')
  @UseInterceptors(
    FileInterceptor("hinh_anh",{
      storage:diskStorage({
        destination:process.cwd()+"/public/img/location",
        filename:(req,file,callback)=>callback(null,new Date().getTime() + "_" + file.originalname)
      })
    })
  )
  postImg(@Param("id") id:number,@Body() body:PostImgLocation,@UploadedFile() hinh_anh:Express.Multer.File,@Headers("token") headers:string){
    return this.locationService.postImg(id,body,hinh_anh.filename,headers)
  }

  @Delete(':id')
  removeLocation(@Param('id') id: number,@Headers("token") headers:string) {
    return this.locationService.removeLocation(id,headers);
  }
}
