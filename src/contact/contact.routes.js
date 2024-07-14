import { Router } from "express";
import { createContact } from "./contact.controller.js";
import { check } from "express-validator";

const router = Router();

router.post(
    "/sendInfo",
    [
        check("email", "Email is required").isEmail(),
    ],
    createContact
);

export default router;