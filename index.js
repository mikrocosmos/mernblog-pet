import express from "express";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";
import {
	registerValidation,
	loginValidation,
	postCreateValidation,
} from "./validation.js";
import { handleValidationErrors, checkAuth } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
	.connect(
		"mongodb+srv://astominsflavadept:BO9Qs5chRDcPABNh@cluster0.ukhwguj.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("DB OK");
	})
	.catch((err) => {
		console.log("DB error", err);
	});

const app = express();
const port = 4000;
app.use(cors());

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads");
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post(
	"/auth/login",
	loginValidation,
	handleValidationErrors,
	UserController.login
);
app.post(
	"/auth/register",
	registerValidation,
	handleValidationErrors,
	UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.get("/posts", PostController.getAll);
app.get("/tags", PostController.getLastTags);
app.get("/posts/:id", PostController.getOne);
app.post(
	"/posts",
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.create
);
app.delete(
	"/posts/:id",
	checkAuth,
	handleValidationErrors,
	PostController.remove
);
app.patch(
	"/posts/:id",
	checkAuth,
	postCreateValidation,
	handleValidationErrors,
	PostController.update
);

app.listen(port, (err) => {
	if (err) {
		return console.error(err);
	}
	console.log(`Server running on port ${port}`);
});
