import Skill from "./skill.model.js";

export const createSkill = async (req, res) => {
    const { nombre, imagen, porcentajeDominio } = req.body;

    try {
        const newSkill = new Skill({
            nombre,
            imagen,
            porcentajeDominio
        });

        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const updateSkill = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagen, porcentajeDominio } = req.body;

    try {
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        skill.nombre = nombre;
        skill.imagen = imagen;
        skill.porcentajeDominio = porcentajeDominio;

        await skill.save();
        res.status(200).json(skill);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const deleteSkill = async (req, res) => {
    const { id } = req.params;

    try {
        const skill = await Skill.findOneAndDelete(id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}