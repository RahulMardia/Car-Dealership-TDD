import { Schema, model, InferSchemaType } from "mongoose";

// Creating Schema for Vehicle 

const vehicleSchema = new Schema(
    {
        make: {
            type: String,
            required: true,
            trim: true
        },
        model: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default:0,
            min: 0
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        }
        
    },
    {
    timestamps: true,
  }
)

export type Vehicle = InferSchemaType<typeof vehicleSchema>;

export default model("Vehicle",vehicleSchema);