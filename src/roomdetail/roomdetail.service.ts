import { Injectable } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import { PostRoomDetail, UpdateRoomDetail } from './dto/roomDetail.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { token } from 'src/auth/auth.service';
@Injectable()
export class RoomdetailService {
 model=new PrismaClient()
 async getRoom(headers:string){
  try{
    if(headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:await this.model.phong.findMany()
      }
    }
   
  }
  catch{
    throw new BadRequestException({status:400,message: "Lỗi Back End",dateTime:new Date()})

  }
 }
 async getRoomLocation(id:number,headers:string){
  try{
    let findId=await this.model.phong.findMany({
      where:{
        vi_tri_id:Number(id)
      }
    })
    if(findId.length!==0 && headers===token){
      return {
        statusCode:200,
        message:"Thành công",
        data:findId
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
 async getRoomById(id:number,headers:string){
  try{
    let findId=await this.model.phong.findFirst({
      where:{
        phong_id:Number(id)
      }
    })
    if(findId && headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:findId
      }
    }
    else{
      throw new BadRequestException({status:400,message: "ID phòngkhông tồn tại",dateTime:new Date()})
    }
    
  }
  catch(exp){
    return exp.response
  }
 }
 async getPage(pageSize:number,pageIndex:number,headers:string){
  let arrRoom=await this.model.phong.findMany()
  let begin=pageSize*(pageIndex-1)
  let end=pageSize
  if(headers===token){
    return{
      statusCode:200,
      message:"Thành công",
      data:arrRoom.splice(begin,end)
    }
  }
 
 }
 async delRoom(id:number,headers:string){
  try{
    if(headers===token){
      return{
        statusCode:200,
        message:"Thành công",
        data:await this.model.phong.delete({
          where:{
            phong_id:Number(id)
          }
        })
      }
    }
    
  }
    catch{
      throw new BadRequestException({status:400,message: "ID phòng không tồn tại",dateTime:new Date()})

    }
 }

 async postRoom(body:PostRoomDetail,file:any,headers:string){
  let{ten_phong,ban_la,ban_ui,bep,dieu_hoa,do_xe,gia_tien,giuong,hinh_anh,ho_boi,khach,may_giat,mo_ta,phong_ngu,phong_tam,tivi,vi_tri_id,wifi}=body
  try{
    if(headers===token){
      return {
        statusCode:200,
        message:"Thành công",
        data:await this.model.phong.create({
          data:{
            ten_phong,
            ban_la:String(ban_la),
            ban_ui:String(ban_ui),
            bep:String(bep),
            dieu_hoa:String(dieu_hoa),
            do_xe:String(do_xe),
            gia_tien:Number(gia_tien),
            giuong:Number(giuong),
            ho_boi:String(ho_boi),
            khach:Number(khach),
            may_giat:String(may_giat),
            mo_ta,
            phong_ngu:Number(khach),
            phong_tam:Number(phong_tam),
            tivi:String(tivi),
            vi_tri_id:Number(vi_tri_id),
            wifi:String(wifi),
            hinh_anh:"localhost:8080/public/img/room/"+file
          }
        })
      }
    }
    
  }
  catch{
    throw new BadRequestException({status:400,message: "Lỗi Back End",dateTime:new Date()})

  }
 
 }

 async updateRoomDetail(body:UpdateRoomDetail,id:number,file:any,headers:string){
  let{phong_id,ban_la,ban_ui,bep,dieu_hoa,do_xe,gia_tien,giuong,hinh_anh,ho_boi,khach,may_giat,mo_ta,phong_ngu,phong_tam,ten_phong,tivi,vi_tri_id,wifi}=body
  try{
    let findId=await this.model.phong.findFirst({
      where:{
        phong_id:Number(id)
      }
    })
    if(findId && Number(phong_id)===Number(id) && headers===token){
      return{
        statusCode:200,
        message:"Cập nhật thành công",
        data:await this.model.phong.update({
          where:{
            phong_id:Number(phong_id)
          },
          data:{
            ban_la,ban_ui,bep,dieu_hoa,do_xe,
            gia_tien:Number(gia_tien),
            giuong:Number(giuong),ho_boi,khach:Number(khach),may_giat,mo_ta,phong_ngu:Number(phong_ngu),phong_tam:Number(phong_tam),ten_phong,tivi,vi_tri_id:Number(vi_tri_id),wifi,
            hinh_anh:"localhost:8080/public/img/room/"+file
          }
        })
      }
    }
    else{
      throw new BadRequestException({status:400,message: "ID phòng không tồn tại",dateTime:new Date()})
    }
  }
  catch(exp){
    return exp.response
  }
 
 }
}
