import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    hecho: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false,
    timestamps: true,
});

//Devuelve un objeto
export default model("Task", taskSchema)

