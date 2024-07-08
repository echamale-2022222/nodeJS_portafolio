import mongoose from 'mongoose';

export const ProjectSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagenPrincipal: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\//
    },
    autor: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true,
        match: /^https?:\/\//
    },
    tecnologiasUtilizadas: {
        type: [{
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
            }
        }],
        required: true,
        validate: {
            validator: function (array) {
                return array.length > 0;
            },
            message: 'Must include at least one technology used'
        }
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Project', ProjectSchema);
