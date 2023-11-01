import { ApiProperty } from "@nestjs/swagger";

export class UserSignUpDto{
    // @ApiProperty()
    // nguoi_dung_id:number
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
    role:"User"
    @ApiProperty({ type: 'string', format: 'binary' })
    anh_dai_dien:any

}
export class UserLoginDto{
    @ApiProperty()
    email:string
    @ApiProperty()
    password:string
}