import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserSignUpDto } from './dto/auth.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiConsumes('multipart/form-data')
  @Post('/signup')
  @UseInterceptors(
    FileInterceptor("anh_dai_dien", // key của FE gửi lên
      {
        // định nghĩa nơi lưu và đặt tên mới
        storage: diskStorage({
          destination: process.cwd() + "/public/img",
          filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
        })

      }
    )
  )
  signup(@Body() body:UserSignUpDto,@UploadedFile() anh_dai_dien:Express.Multer.File){
    return this.authService.signup(body,anh_dai_dien.filename)
  }

  @Post("/login")
  login(@Body() body:UserLoginDto){
    return this.authService.login(body)
  }
 
}
