import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

@Schema({timestamps: true})
export class Expense extends Document {
    @Prop()
    name: string;

    @Prop()
    cost: number;

    @Prop()
    createdAt: string;

    @Prop()
    updatedAt: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: mongoose.Schema.Types.ObjectId;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);


