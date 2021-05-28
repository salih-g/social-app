import { AUTH } from '../constants/actionTypes';

import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
	try {
		// Log in user

		history.push('/');
	} catch (err) {
		console.error(err);
	}
};

export const signup = (formData, history) => async (dispatch) => {
	try {
		//sign up the user

		history.push('/');
	} catch (err) {
		console.error(err);
	}
};
