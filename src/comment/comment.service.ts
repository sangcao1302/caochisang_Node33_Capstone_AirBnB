import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CommentPostDto, CommentUpdateDto } from './dto/comment.dto';
import { token } from 'src/auth/auth.service';

@Injectable()
export class CommentService {
  model =new PrismaClient()

  async getComment(headers:string){
    try{
      let getAllComment=await this.model.binh_luan.findMany()
      if(getAllComment.length!==0 && headers===token){
        return{
          statusCode:200,
          message:"Thành công",
          data:getAllComment
        }
      }
      else{
        return{
          statusCode:200,
          message:"Không có comment"
        }
      }
    }
    catch(exp){
      throw new BadRequestException({status:400,message: "Lỗi Back End",dateTime:new Date()})

    }
   
  }
  async postComment(body:CommentPostDto,id:number,headers:string){
    try{
      let {nguoi_dung_id,phong_id,ngay_binh_luan,noi_dung,sao_binh_luan}=body
      let findId=this.model.binh_luan.findFirst({
        where:{
          nguoi_dung_id:Number(id)
        }
      })
      if(findId && Number(id)===Number(nguoi_dung_id) && headers===token){
        let data=await this.model.binh_luan.create({
          data:{
            nguoi_dung_id:Number(nguoi_dung_id),
            phong_id:Number(phong_id),
            ngay_binh_luan,
            noi_dung,
            sao_binh_luan
          }
        })
        return{
          statusCode:200,
          message:"Thành công",
          data:data
        }
      }
      else{
        throw new BadRequestException({status:400,message: "Id không tồn tại",dateTime:new Date()})

      }
    }
    catch(exp)
    {
      return exp.response
    }
  
    
  }

  async putComment(body:CommentUpdateDto,id:number,headers:string){
    try{
      let{binh_luan_id,nguoi_dung_id,phong_id,ngay_binh_luan,noi_dung,sao_binh_luan}=body
      let findIdComment=await this.model.binh_luan.findFirst({
        where:{
          binh_luan_id:Number(id)
        }
      })
      if(findIdComment && Number(id)===Number(binh_luan_id) && headers===token){
        return{
          statusCode:200,
          message:"Cập nhật thành công",
          data:await this.model.binh_luan.update({
            where:{
              binh_luan_id:Number(binh_luan_id)
            },
            data:{
              nguoi_dung_id,
              phong_id,
              ngay_binh_luan,noi_dung,sao_binh_luan
            }
          })
        }
      }
      else{
        throw new BadRequestException({status:400,message: "ID bình luận không tồn tại",dateTime:new Date()})
      }
    }
    catch(exp){
      return exp.response
    }
  
  }

  async delComment(id:number,headers:string){
    try{
      let findId=await this.model.binh_luan.delete({
        where:{
          binh_luan_id:Number(id)
        }
      })
      if(findId && headers===token){
        return{
          statusCode:200,
          message:"Xóa thành công",
          data:findId
        }
      }
      else{
        throw new BadRequestException({status:400,message: "ID bình luận không tồn tại",dateTime:new Date()})

      }
    }
    catch(exp){
      return exp.response
    }
  
  }

  async getCommentByUserId(id:number,headers:string){
    try{
      let findId=await this.model.binh_luan.findMany({
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
        throw new BadRequestException({status:400,message: "ID người dùng không tồn tại",dateTime:new Date()})
      }
    }
    catch(exp){
      return exp.response
    }
   
  }

}
