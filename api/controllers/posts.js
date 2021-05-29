import mongoose from 'mongoose';
import PostMessage from '../models/PostMessage.js';

export const getPosts = async (_, res) => {
	try {
		const postMessage = await PostMessage.find();

		res.status(200).json(postMessage);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	const newPost = new PostMessage(post);

	try {
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that id');

	const updatedPost = await PostMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{ new: true }
	);

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id: _id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that id');

	await PostMessage.findByIdAndRemove(_id);

	res.json({ message: 'Post deleted succesfuly' });
};

export const likePost = async (req, res) => {
	const { id: _id } = req.params;

	if (!req.userId)
		return res.status(401).json({ message: 'Unauthorized' });

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No post with that id');

	const post = await PostMessage.findById(_id);

	const index = post.likes.findIndex(
		(id) => id === String(req.userId)
	);

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter((id) => id !== String(req.userId));
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
		new: true,
	});

	res.json(updatedPost);
};
