import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";


export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    cost: number;
    
    @IsMongoId()
    user: mongoose.Schema.Types.ObjectId;
}
