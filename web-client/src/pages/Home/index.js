import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import {
	Container,
	Grow,
	Grid,
	Paper,
	AppBar,
	TextField,
	Button,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';

import { getPosts } from '../../actions/posts';

import Posts from '../../components/Posts';
import Form from '../../components/Form';
import Pagination from '../../components/Pagination';

import useStyles from './styles';

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Home = () => {
	const classes = useStyles();

	//CurrentId
	const [currentId, setCurrentId] = useState(null);
	const dispatch = useDispatch();
	const query = useQuery();
	const history = useHistory();

	const page = query.get('page') || 1;
	const searchQuery = query.get('searchQuery');

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					className={classes.mainContainer}
					justify='space-between'
					alignItems='stretch'
					spacing={3}
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						<Paper className={classes.pagination} elevation={6}>
							<Pagination />
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
