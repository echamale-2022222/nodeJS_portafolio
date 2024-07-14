import { Router } from "express";
import { createContact } from "./contact.controller.js";
import { check } from "express-validator";

const router = Router();

router.post(
    "/sendInfo",
    [
        check("email", "Email is required").isEmail(),
        check("asunto", "Subject is required").not().isEmpty(),
        check("mensaje", "Message is required").not().isEmpty(),
    ],
    createContact
);

export default router;