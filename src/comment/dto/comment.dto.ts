import { ApiProperty } from "@nestjs/swagger";

export class CommentPostDto{
   
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty()
    phong_id:number
    @ApiProperty()
    ngay_binh_luan:Date
    @ApiProperty()
    noi_dung:string
    @ApiProperty()
    sao_binh_luan:number
}
export class CommentUpdateDto{
    @ApiProperty()
    binh_luan_id:number
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty()
    phong_id:number
    @ApiProperty()
    ngay_binh_luan:Date
    @ApiProperty()
    noi_dung:string
    @ApiProperty()
    sao_binh_luan:number
}