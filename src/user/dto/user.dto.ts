import { ApiProperty } from "@nestjs/swagger";

 
export class UpdateUser{
    @ApiProperty()
    nguoi_dung_id:number
    @ApiProperty()
    name:string
    @ApiProperty()
    email:string
    @ApiProperty()
    password:string
    @ApiProperty()
    phone:string
    @ApiProperty()
    birthday:string
    @ApiProperty()
    gender:string
    @ApiProperty()
    role:"user"
    @ApiProperty({type:"string",format:"binary"})
    anh_dai_dien:any
}