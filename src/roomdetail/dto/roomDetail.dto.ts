import { ApiProperty } from "@nestjs/swagger"

export class PostRoomDetail{
  @ApiProperty() 
  ten_phong: string
  @ApiProperty() 
  khach: number
  @ApiProperty() 
  phong_ngu: number
  @ApiProperty() 
  giuong: number
  @ApiProperty() 
  phong_tam: number
  @ApiProperty() 
  mo_ta: string
  @ApiProperty() 
  gia_tien: number
  @ApiProperty() 
  may_giat: boolean
  @ApiProperty() 
  ban_la: boolean
  @ApiProperty() 
  tivi: boolean
  @ApiProperty() 
  dieu_hoa: boolean
  @ApiProperty() 
  wifi: boolean
  @ApiProperty() 
  bep: boolean
  @ApiProperty() 
  do_xe: boolean
  @ApiProperty() 
  ho_boi: boolean
  @ApiProperty() 
  ban_ui: boolean
  @ApiProperty() 
  vi_tri_id: number
  @ApiProperty({type:"string",format:"binary"}) 
  hinh_anh: any
}

export class UpdateRoomDetail{
    @ApiProperty()
    phong_id:number
    @ApiProperty() 
    ten_phong: string
    @ApiProperty() 
    khach: number
    @ApiProperty() 
    phong_ngu: number
    @ApiProperty() 
    giuong: number
    @ApiProperty() 
    phong_tam: number
    @ApiProperty() 
    mo_ta: string
    @ApiProperty() 
    gia_tien: number
    @ApiProperty() 
    may_giat:string
    @ApiProperty() 
    ban_la:string
    @ApiProperty() 
    tivi:string
    @ApiProperty() 
    dieu_hoa:string
    @ApiProperty() 
    wifi:string
    @ApiProperty() 
    bep:string
    @ApiProperty() 
    do_xe:string
    @ApiProperty() 
    ho_boi:string 
    @ApiProperty() 
    ban_ui:string
    @ApiProperty() 
    vi_tri_id: number
    @ApiProperty({type:"string",format:"binary"}) 
    hinh_anh: any
  }