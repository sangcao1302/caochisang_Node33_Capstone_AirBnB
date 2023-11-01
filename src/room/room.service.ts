import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostRoomDto, UpdateBookRoomDto } from './dto/room.dto';
import { token } from 'src/auth/auth.service';


@Injectable()
export class RoomService {
 model=new PrismaClient()
 async postRoom(body:PostRoomDto,headers:string){
  try{
    let{nguoi_dung_id,phong_id,ngay_den,ngay_di,so_luong_khach}=body
    if(headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:await this.model.dat_phong.create({
          data:{
            nguoi_dung_id,
            phong_id,ngay_den,ngay_di,so_luong_khach
          }
        })
      }
    }
   
  }
  catch{
    throw new BadRequestException({status:400,message: "Người dùng ID hoặc phòng không tồn tại",dateTime:new Date()})
  }
 
 }
async getAllRoom(headers:string){
 
  try{
    if(headers===token){
      return {
        statusCode:200,
        message:"Thành công",
        data:await this.model.dat_phong.findMany()
      }
    }
   
  }
  catch{
    throw new BadRequestException({status:400,message: "Lỗi Back End",dateTime:new Date()})
  }
}
 async getRoomId(id:number,headers:string){
  try{
    let findId=await this.model.dat_phong.findFirst({
      where:{
        dat_phong_id:Number(id)
      }
    })
    if(findId && headers===token){
      return{
        statusCode:200,
        message:'Thành công',
        data:findId
      }
    }
   else{
    throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
   }
  }catch(exp){
    return exp.response
  }

 }

 async getRoomByUserId(id:number,headers:string){
    let findId=await this.model.dat_phong.findMany({
      where:{
        nguoi_dung_id:Number(id)
      }
    })
    if(findId.length!==0 && headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:findId
      }
    }
   else{
    throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})

   }
 
   
 }
  async updateBookRoom(body:UpdateBookRoomDto,id:number,headers:string){
    let{dat_phong_id,nguoi_dung_id,phong_id,ngay_den,ngay_di,so_luong_khach}=body
    let findBookRoomId=await this.model.dat_phong.findFirst({
      where:{
        dat_phong_id:Number(id)
      }
    })
    if(findBookRoomId && Number(dat_phong_id)===Number(id) && headers===token){
      return{
        statusCode:200,
        message:"Cập nhật thành công",
        data:await this.model.dat_phong.update({
          where:{
            dat_phong_id:Number(dat_phong_id)
          },
          data:{
            dat_phong_id,
            nguoi_dung_id,
            phong_id,
            ngay_den,
            ngay_di,
            so_luong_khach
          }
        })
      }
    }
    else{
      throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
    }
  } 
  async deleteRoom(id:number,headers:string){
   try{
    if(headers===token){
      return{
        statusCode:200,
        message:"Xóa thành công",
        data:await this.model.dat_phong.delete({
          where:{
            dat_phong_id:Number(id)
          }
        })
      }
    }
   
   }
   catch{
    throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
   }
    
  }

}
