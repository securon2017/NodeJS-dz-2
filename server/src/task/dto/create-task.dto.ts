import { IsDate, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    title: string;
    @IsString()
    text: string;
    @IsDate()
    createdDate: Date;
}