import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
	try {
		const posts = await PostModel.find().limit(5).exec();
		const tags = posts
			.map((obj) => obj.tags)
			.flat()
			.slice(0, 5);
		res.json(tags);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Cannot find articles",
		});
	}
};

export const getAll = async (req, res) => {
	try {
		const posts = await PostModel.find().populate("author").exec();
		res.json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Cannot find articles",
		});
	}
};

export const getOne = async (req, res) => {
	try {
		const postId = req.params.id;

		const article = await PostModel.findById(postId);

		if (!article) {
			return res.status(404).json({ message: "Article not found" });
		}
		article.viewsCount += 1;
		await article.save();

		res.json(article);
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Post getting failed",
		});
	}
};

export const remove = async (req, res) => {
	try {
		const postId = req.params.id;

		const article = await PostModel.findById(postId);

		if (!article) {
			return res.status(404).json({ message: "Article not found" });
		}
		await article.deleteOne();

		res.json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Post delete failed",
		});
	}
};

export const create = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			author: req.userId,
		});

		const post = await doc.save();

		res.json(post);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Post error",
		});
	}
};

export const update = async (req, res) => {
	try {
		const postId = req.params.id;

		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.userId,
				tags: req.body.tags,
			}
		);
		res.json({ success: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Post update failed",
		});
	}
};
