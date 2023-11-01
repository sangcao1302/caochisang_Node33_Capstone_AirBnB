import { BadRequestException, Injectable } from '@nestjs/common';
import { UserLoginDto, UserSignUpDto } from './dto/auth.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export let token:string=""
@Injectable()

export class AuthService {
model =new PrismaClient()
constructor(

  private jwtService: JwtService
) { }
 async signup(body:UserSignUpDto,file:any){
  
    let{name,email,password,phone,birthday,gender,role,anh_dai_dien}=body
    let findEmail=await this.model.nguoi_dung.findFirst({
      where:{
        email
      }
    })
    if(findEmail){
      throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Email đã tồn tại',dateTime:new Date()})
    }
    else{
      const createUser=await this.model.nguoi_dung.create({
        data: {
         name,email,password,phone,birthday,gender,
         anh_dai_dien:"localhost:8080/public/image/"+file
        },
       
      })
      return [{
        "statusCode":200,
        "message":"Đăng kí thành công",
        "content":{
          "id":(await createUser).nguoi_dung_id,
          "hoten":(await createUser).name,
          "email":(await createUser).email,
          "matkhau":(await createUser).password,
          "tuoi":(await createUser).phone,
          "avatar":(await createUser).anh_dai_dien,
          "birthday":(await createUser).birthday,
          "gender":(await createUser).gender,
          "role":(await createUser).role
        }
      }]
    }
  
  

  }
  async login(body:UserLoginDto){
    let{email,password}=body
    let findEmail=await this.model.nguoi_dung.findFirst({
      where:{
        email
      }
    })
    if(findEmail!==null){
      const saltOrRounds=10
      const mat_khau=findEmail.password
      const hash=await bcrypt.hash(mat_khau,saltOrRounds)
      let checkpass=await bcrypt.compare(password,hash)
      if(checkpass){
        token = this.jwtService.sign({ data: findEmail }, { expiresIn: "120m", secret: "SangCao" });

        return {
          statuscode:200,
          message:"Đăng nhập thành công",
          content:{
            email:findEmail.email,
            name:findEmail.name,
            phone:findEmail.phone,
            gender:findEmail.gender,
            token:token
          }
        }
      }
      else{
        throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Sai mật khẩu hoặc tên đăng nhập',dateTime:new Date()})
  
      }
    }
    else{
      throw new BadRequestException({status:400,message: "Yêu cầu không hợp lệ!",content:'Email không tồn tại',dateTime:new Date()})
    }
  }

}
