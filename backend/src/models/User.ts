import { Schema, model, InferSchemaType } from "mongoose";


// Creating Schema for User Registration 

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user","admin"],
            default: "user",
        },
        
        
    },
    {
    timestamps: true,
  }
)

export type User = InferSchemaType<typeof userSchema>;

export default model("users",userSchema);