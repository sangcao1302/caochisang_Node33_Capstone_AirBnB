import { Controller, Get, Post, Body, Patch, Param, Delete,Put,Headers } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CommentPostDto,CommentUpdateDto } from './dto/comment.dto';

@ApiTags("Bình luận")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get("")
  getComment(@Headers("token") headers:string){
    return this.commentService.getComment(headers)
  }
  @Post("/post/:userId")
  postComment(@Body() body:CommentPostDto, @Param("userId") userId:number,@Headers("token") headers:string){
    return this.commentService.postComment(body,userId,headers)
  }
  @Put("update/:binhLuanId")
  putComment(@Body() body:CommentUpdateDto , @Param ("binhLuanId") binhLuanId:number,@Headers("token") headers:string){
    return this.commentService.putComment(body,binhLuanId,headers)
  }
  @Delete("delete/:binhLuanId")
  delComment(@Param("binhLuanId") binhLuanId:number,@Headers("token") headers:string){
    return this.commentService.delComment(binhLuanId,headers)
  }
  @Get("byUserId/:userId")
  getCommentByUserId(@Param("userId") userId:number,@Headers("token") headers:string){
    return this.commentService.getCommentByUserId(userId,headers)
  }

}
