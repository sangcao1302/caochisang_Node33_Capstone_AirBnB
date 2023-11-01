import { ApiProperty } from "@nestjs/swagger";

export class PostRoomDto{
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty() 
    phong_id:number
    @ApiProperty()
    ngay_den:Date
    @ApiProperty()
    ngay_di:Date
    @ApiProperty()
    so_luong_khach:number
}
export class UpdateBookRoomDto{
    @ApiProperty()
    dat_phong_id:number
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty() 
    phong_id:number
    @ApiProperty()
    ngay_den:Date
    @ApiProperty()
    ngay_di:Date
    @ApiProperty()
    so_luong_khach:number
}