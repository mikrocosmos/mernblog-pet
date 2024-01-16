import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
	try {
		const passwordHash = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(passwordHash, salt);

		const doc = new UserModel({
			email: req.body.email,
			userName: req.body.userName,
			password: hash,
			avatarUrl: req.body.avatarUrl,
		});

		const user = await doc.save();

		const token = jwt.sign(
			{
				_id: user._id,
			},
			"secretKey",
			{
				expiresIn: "30d",
			}
		);

		const { password, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Registration error",
		});
	}
};

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).json({ message: "Invalid login or password" });
		}
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user._doc.password
		);

		if (!isValidPassword) {
			return res.status(400).json({ message: "Invalid login or password" });
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			"secretKey",
			{
				expiresIn: "30d",
			}
		);
		const { password, ...userData } = user._doc;

		res.json({ ...userData, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Login error",
		});
	}
};

export const getMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);
		if (!user) {
			return res.status(404).json({
				message: "No such users found",
			});
		}
		const { password, ...userData } = user._doc;
		res.json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Auth error",
		});
	}
};
