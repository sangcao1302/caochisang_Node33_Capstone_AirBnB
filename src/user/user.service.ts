import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UpdateUser } from './dto/user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { token } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  model=new PrismaClient()


  async getUser(headers:string){
    try{
      if(headers===token){
        return{
          statusCode:200,
          message:"Thành công",
          data:await this.model.nguoi_dung.findMany()
        }
      }
      
    }
    catch{
      throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
    }
  }
  async delUser(id:number,headers:string){
    try{
      if(headers===token){
        return{
          statusCode:200,
          message:"Xóa thành công",
          data:await this.model.nguoi_dung.delete({
            where:{
              nguoi_dung_id:Number(id)
            }
          })
        }
      }
     
  }
  catch{
    throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
  }
   
  }
  async getPageUser(pageIndex:number,pageSize:number,headers:string){
    let findPage=await this.model.nguoi_dung.findMany()
    let beginGet=pageSize*(pageIndex-1)
    let endGet=pageSize
    if(headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:findPage.splice(beginGet,endGet)
      }
    }
    
  }
  async getUserId(id:number,headers:string){
    try{
      let findId=await this.model.nguoi_dung.findFirst({
        where:{
          nguoi_dung_id:Number(id)
        }
      })
      if(findId && headers===token){
        return {
          statusCode:200,
          message:"Thành công",
          data:findId
        }
      }
      else{
        throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
      }
    }
    catch(exp){
      return exp.response
    }
    
  }
  async updateUser(body:UpdateUser,id:number,file:any,headers:string){
    try{
      let{nguoi_dung_id,name,email,password,phone,birthday,gender,anh_dai_dien}=body
      let findUserId=await this.model.nguoi_dung.findFirst({
        where:{
          nguoi_dung_id:Number(id)
        }
      })
      if(findUserId && Number(nguoi_dung_id)=== Number(id) && headers===token){
        return{
          statusCode:200,
          message:"Cập nhật thành công",
          data:await this.model.nguoi_dung.update({
            where:{
              nguoi_dung_id:Number(nguoi_dung_id)
            },
            data:{
              name,email,password,phone,birthday,gender,
              anh_dai_dien:"localhost:8080/public/img/"+file
            }
          })
        }
      }
      else{
        throw new BadRequestException({status:400,message: "ID không tồn tại",dateTime:new Date()})
      }
    }
    catch(exp){
     return exp.response

    }
    
  }
  async getUserName(nameUser:string,headers:string){
    try{
      let findName=await this.model.nguoi_dung.findFirst({
        where: {
          name: {
            contains: nameUser
          }
        }
      })
      if(findName && headers===token){
        return{
          statusCode:200,
          message:"Thành công",
          data:findName
        }
      }
      else{
        throw new BadRequestException({status:400,message: "Người dùng không tồn tại",dateTime:new Date()})
      }
    }
    catch(exp){
      return exp.response
    }
    
  }

}
