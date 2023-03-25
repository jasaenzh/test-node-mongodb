import { Schema, model } from "mongoose";
import mongosePaginate from "mongoose-paginate-v2";

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

taskSchema.plugin(mongosePaginate);
//Devuelve un objeto
export default model("Task", taskSchema)

