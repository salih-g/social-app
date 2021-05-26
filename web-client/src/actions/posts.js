import * as api from '../api';

//Action creators
export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts();
		dispatch({ type: 'FETCH_ALL', payload: data });
	} catch (err) {
		console.error(err.message);
	}
};

export const createPost = (post) => async (dispatch) => {
	try {
		const { data } = await api.createPost(post);

		dispatch({ type: 'CREATE', payload: data });
	} catch (err) {
		console.error(err.message);
	}
};
