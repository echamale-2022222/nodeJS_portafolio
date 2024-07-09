import { Router } from "express";
import { check } from "express-validator";
import { createSkill, getSkills, updateSkill, deleteSkill } from "./skill.controller.js";

const router = Router();

router.post('/addSkills', [
    check('nombre', 'Name is required').not().isEmpty(),
    check('imagen', 'Image is required').not().isEmpty(),
    check('porcentajeDominio', 'Skill level is required').not().isEmpty()
], createSkill);

router.get('/skills', getSkills);

router.put('/skills/:id', updateSkill);

router.delete('/skills/:id', deleteSkill);

export default router;