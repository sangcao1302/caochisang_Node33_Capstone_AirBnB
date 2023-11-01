import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {PrismaClient } from '@prisma/client';
import { PostImgLocation, PostLocation, UpdateLocation } from './dto/location.dto';
import { token } from 'src/auth/auth.service';

@Injectable()
export class LocationService {
  model=new PrismaClient()
 async getLocation(headers:string) {
  try{
    let location=await this.model.vi_tri.findMany()
    if(location.length!==0 && headers===token){
      return {
        statusCode:200,
        message:"Thành công",
        data:location
      }
    }
    else{
      return{
        statusCode:400,
        message:"Không có dữ liệu vị trí"
      }
    }
  }

   catch(exp){
    throw new BadRequestException({status:400,message: "Lỗi Back End",dateTime:new Date()})
   }
 

  }

  async getLocationId(id: number,headers:string) {
    try{
      let findId=await this.model.vi_tri.findFirst({
        where:{
          vi_tri_id:Number(id)
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

  async getPage(pageSize:number,pageIndex:number,headers:string){
    let begin=pageSize*(pageIndex-1)
    let end= pageSize
    if(headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:(await this.model.vi_tri.findMany()).splice(begin,end)
      }
    }
  
  }

  async postLocation(body:PostLocation,file:any,headers:string){
    let{tinh_thanh,hinh_anh,quoc_gia,ten_vi_tri}=body
    let findLocation=await this.model.vi_tri.findFirst({
      where:{
        ten_vi_tri
      }
    })
    if(!findLocation && headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:await this.model.vi_tri.create({
          data:{
            tinh_thanh,quoc_gia,ten_vi_tri,
            hinh_anh:"localhost:8080/public/img/location/"+file
          }
        })
      }
    }
    else{
      throw new BadRequestException({status:400,message: "Vị trí đã tồn tai",dateTime:new Date()})
    }
   
  }

    async updateLocation(id:number,body:UpdateLocation,headers:string){
      try{
        let{vi_tri_id,quoc_gia,ten_vi_tri,tinh_thanh}=body
        let findId=await this.model.vi_tri.findFirst({
          where:{
            vi_tri_id:Number(id)
          }
        })
        if(findId && Number(vi_tri_id)===Number(id) && headers===token){
          return{
            statusCode:200,
            message:"Thành công",
            data:await this.model.vi_tri.update({
              where:{
                vi_tri_id:Number(id)
              },
              data:{
                quoc_gia,ten_vi_tri,tinh_thanh,
               
              }
            })
          }
        }
        else{
          throw new BadRequestException({status:400,message: "ID vị trí không tồn tại",dateTime:new Date()})
        }
      }
      catch(exp){
        return exp.response
      }
     
    }

    async postImg(id:number,body:PostImgLocation,file:any,headers:string)
    {
      try{
        let findId=await this.model.vi_tri.findFirst({
          where:{
            vi_tri_id:Number(id)
          }
        })
        if(findId && headers===token){
          return{
            statusCode:200,
            message:"Thành công",
            data:await this.model.vi_tri.update({
              where:{
                vi_tri_id:Number(id)
              },
              data:{
                hinh_anh:"localhost:8080/public/img/location/"+file
              }
            })
          }
        }
        else{
          throw new BadRequestException({status:400,message: "ID vị trí không tồn tại",dateTime:new Date()})
        }
      }
      catch(exp){
        return exp.response
      }
    }
  async removeLocation(id: number,headers:string) {
   
    try{
      if(headers===token){
        return {
          statusCode:200,
          message:"Xóa thành công",
          data:await this.model.vi_tri.delete({
            where:{
              vi_tri_id:Number(id)
            }
          })
        }
      }
   

    }
      catch{
        throw new BadRequestException({status:400,message: "ID vị trí không tồn tại",dateTime:new Date()})
      }
  }
}
