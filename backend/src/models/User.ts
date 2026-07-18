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
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address"
            ]
        },
        password: {
            type: String,
            required: true,
            match: [
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                "Password must be at least 6 characters long and contain at least one letter and one number"
            ]
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