import { body } from "express-validator";

export const loginValidation = [
	body("email").isEmail().withMessage("Email must be a valid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
];

export const registerValidation = [
	body("userName")
		.isLength({ min: 3 })
		.withMessage("Username must be at least 3 characters long"),
	body("email").isEmail().withMessage("Email must be a valid email"),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be at least 6 characters long"),
	body("avatarUrl").optional().isURL(),
];

export const postCreateValidation = [
	body("title")
		.isLength({ min: 3 })
		.withMessage("Title must be at least 3 characters long"),
	body("text")
		.isLength({ min: 10 })
		.withMessage("Article text must be at least 6 characters long"),
	body("tags", "Incorrect tags format").optional().isString(),
	body("imageUrl").optional().isURL(),
];
