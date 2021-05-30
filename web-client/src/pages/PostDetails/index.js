import React from 'react';

import moment from 'moment';

import { Typography, Divider } from '@material-ui/core';

import useStyles from './styles';

const PostDetails = ({ post }) => {
	const classes = useStyles();

	return (
		<div>Post Details</div>
		// <div className={classes.card}>
		// 	<div className={classes.section}>
		// 		<Typography variant='h3' component='h2'>
		// 			{post.title}
		// 		</Typography>
		// 		<Typography
		// 			gutterBottom
		// 			variant='h6'
		// 			color='textSecondary'
		// 			component='h2'
		// 		>
		// 			{post.tags.map((tag) => `#${tag} `)}
		// 		</Typography>
		// 		<Typography gutterBottom variant='body1' component='p'>
		// 			{post.message}
		// 		</Typography>
		// 		<Typography variant='h6'>Created by: {post.name}</Typography>
		// 		<Typography variant='body1'>
		// 			{moment(post.createdAt).fromNow()}
		// 		</Typography>
		// 		<Divider style={{ margin: '20px 0' }} />
		// 		<Typography variant='body1'>
		// 			<strong>Realtime Chat - coming soon!</strong>
		// 		</Typography>
		// 		<Divider style={{ margin: '20px 0' }} />
		// 		<Typography variant='body1'>
		// 			<strong>Comments - coming soon!</strong>
		// 		</Typography>
		// 		<Divider style={{ margin: '20px 0' }} />
		// 	</div>
		// 	<div className={classes.imageSection}>
		// 		<img
		// 			className={classes.media}
		// 			src={
		// 				post.selectedFile ||
		// 				'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
		// 			}
		// 			alt={post.title}
		// 		/>
		// 	</div>
		// </div>
	);
};

export default PostDetails;
