import { ApiProperty } from "@nestjs/swagger";

export class SuccessResponse  {

    @ApiProperty()
    message: string;
    
    @ApiProperty()
    status: boolean
}