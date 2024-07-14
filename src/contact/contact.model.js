import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    asunto: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
});

export default mongoose.model('Contact', contactSchema);