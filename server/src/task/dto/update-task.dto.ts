import { IsDate, isNumber, IsString } from "class-validator";

export class UpdateTaskDto {
    
    id: number;
    @IsString()
    title: string;
    @IsString()
    text: string;
    @IsDate()
    createdDate: Date;
}