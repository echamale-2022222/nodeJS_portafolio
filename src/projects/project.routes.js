import { Router } from "express";
import { check } from "express-validator";
import { createProject, getProjects, updateProject, deleteProject } from "./project.controller.js";

const router = Router();

router.post('/addProjects', [
    check('titulo', 'Title is required').not().isEmpty(),
    check('descripcion', 'Description is required').not().isEmpty(),
    check('imagenPrincipal', 'Main image is required').not().isEmpty(),
    check('autor', 'Author is required').not().isEmpty(),
    check('link', 'Link is required').not().isEmpty(),
    check('tecnologiasUtilizadas', 'Technologies used are required').not().isEmpty()
], createProject);

router.get('/projects', getProjects);

router.put('/projects/:id', updateProject);

router.delete('/projects/:id', deleteProject);

export default router;