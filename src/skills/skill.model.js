import mongoose from "mongoose";

export const SkillSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\// 
    },
    porcentajeDominio: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

export default mongoose.model("Skill", SkillSchema);