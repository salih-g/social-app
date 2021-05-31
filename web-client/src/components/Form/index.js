import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, Button, Typography, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import useStyles from './styles';

import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
	const classes = useStyles();

	const user = JSON.parse(localStorage.getItem('profile'));

	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null
	);
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	});
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.result?.name })
			);
		} else {
			dispatch(createPost({ ...postData, name: user?.result?.name }));
		}

		setPostData({
			title: '',
			message: '',
			tags: [],
			selectedFile: '',
		});
		setCurrentId(null);
	};

	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please Sign In to create post and like other post
				</Typography>
			</Paper>
		);
	}

	const handleAddChip = (tag) => {
		setPostData({ ...postData, tags: [...postData.tags, tag] });
	};

	const handleDeleteChip = (chipToDelete) => {
		setPostData({
			...postData,
			tags: postData.tags.filter((tag) => tag !== chipToDelete),
		});
	};

	return (
		<Paper className={classes.paper}>
			<form
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Edit a ' : 'Create a '} Post
				</Typography>
				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) =>
						setPostData({
							...postData,
							title: e.target.value,
						})
					}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) =>
						setPostData({
							...postData,
							message: e.target.value,
						})
					}
				/>
				<ChipInput
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onAdd={(chip) => handleAddChip(chip)}
					onDelete={(chip) => handleDeleteChip(chip)}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) =>
							setPostData({
								...postData,
								selectedFile: base64,
							})
						}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					Submit
				</Button>
			</form>
		</Paper>
	);
};

export default Form;
