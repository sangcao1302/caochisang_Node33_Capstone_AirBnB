import { ApiProperty } from "@nestjs/swagger";

export class PostLocation{
   
    @ApiProperty()
    ten_vi_tri:string
    @ApiProperty()
    tinh_thanh:string
    @ApiProperty()
    quoc_gia:string
    @ApiProperty({type:"string",format:"binary"})
    hinh_anh:any
}

export class UpdateLocation{
    @ApiProperty()
    vi_tri_id:Number
    @ApiProperty()
    ten_vi_tri:string
    @ApiProperty()
    tinh_thanh:string
    @ApiProperty()
    quoc_gia:string
}
export class PostImgLocation{
    @ApiProperty({type:"string",format:"binary"})
    hinh_anh:any
}