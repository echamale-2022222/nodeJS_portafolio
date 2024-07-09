import Project from './project.model.js';

export const createProject = async (req, res) => {
    const { titulo, descripcion, imagenPrincipal, imagenes, autor, link, tecnologiasUtilizadas } = req.body;

    try {
        const newProject = new Project({
            titulo,
            descripcion,
            imagenPrincipal,
            imagenes,
            autor,
            link,
            tecnologiasUtilizadas
        });

        await newProject.save();
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

export const updateProject = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, imagenPrincipal, autor, link, tecnologiasUtilizadas } = req.body;

    try {
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.titulo = titulo;
        project.descripcion = descripcion;
        project.imagenPrincipal = imagenPrincipal;
        project.autor = autor;
        project.link = link;
        project.tecnologiasUtilizadas = tecnologiasUtilizadas;

        await project.save();
        res.status(200).json(project);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

export const deleteProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findOneAndDelete(id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}
