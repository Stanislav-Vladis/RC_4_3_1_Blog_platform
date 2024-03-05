// eslint-disable-next-line import/namespace
// import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { setArticlesList } from '../redux/slices/articlesList.slice';
import { setWait, setLoading, setError, setSuccess } from '../redux/slices/serverStatus.slice';
import { setArticleDetail, setCurrentSlug, setDeleteArticle } from '../redux/slices/article.slice';
import { setUser } from '../redux/slices/user.slice';

const API_BASE = 'https://blog.kata.academy/api';
const USER_PATH = 'user';
const USERS_PATH = 'users';
const ARTICLES_PATH = 'articles';
const FAVORITE_PATH = 'favorite';

const fetchData = props => async dispatch => {
	const { action, option } = props;
	try {
		dispatch(setLoading());
		const res = await action();
		option ? await dispatch(option(res)) : null;
		await dispatch(setSuccess());
		dispatch(setWait());
	} catch (error) {
		const errorData = {
			message: error.message,
			data: error.response.data.errors,
		};
		if (error.response.status === 422) {
			dispatch(setWait(errorData));
		} else {
			dispatch(setError(errorData));
		}
	}
};

export const fetchArticlesList = body => async (dispatch, getState) => {
	const offset = body.currentPage === 1 ? 0 : body.currentPage * body.pageSize - body.pageSize;
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				const url = new URL(`${API_BASE}/${ARTICLES_PATH}`);
				url.searchParams.append('offset', offset);
				url.searchParams.append('limit', body.pageSize);

				const { data } = await axios.get(url, {
					headers: {
						Authorization: API_KEY,
					},
				});

				return data;
			},
			option: setArticlesList,
		})
	);
};

export const fetchArticleDetail = slug => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				const { data } = await axios.get(`${API_BASE}/${ARTICLES_PATH}/${slug}`, {
					headers: {
						Authorization: API_KEY,
					},
				});
				return data;
			},
			option: setArticleDetail,
		})
	);
};

export const fetchArticleNew = body => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				const { data } = await axios.post(
					`${API_BASE}/${ARTICLES_PATH}`,
					{
						article: { ...body },
					},
					{
						headers: {
							Authorization: API_KEY,
							'Content-Type': 'application/json',
						},
					}
				);
				return data;
			},
			option: setCurrentSlug,
		})
	);
};

export const fetchArticleUpdate = prop => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;
	const { data, slug } = prop;

	dispatch(
		fetchData({
			action: async () => {
				const response = await axios.put(
					`${API_BASE}/${ARTICLES_PATH}/${slug}`,
					{
						article: { ...data },
					},
					{
						headers: {
							Authorization: API_KEY,
						},
					}
				);
				return response.data;
			},
			option: setCurrentSlug,
		})
	);
};

export const fetchArticleDelete = slug => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				await axios.delete(`${API_BASE}/${ARTICLES_PATH}/${slug}`, {
					headers: {
						Authorization: API_KEY,
					},
				});
				dispatch(setDeleteArticle(true));
			},
		})
	);
};

export const fetchSignInUser = body => async dispatch => {
	dispatch(
		fetchData({
			action: async () => {
				const { email, password } = body;
				const { data } = await axios.post(`${API_BASE}/users/login`, {
					user: {
						email: email.toLowerCase().trim(),
						password: password.trim(),
					},
				});

				return data.user;
			},
			option: setUser,
		})
	);
};

export const fetchSignUpUser = body => async dispatch => {
	const { username, email, password } = body;

	dispatch(
		fetchData({
			action: async () => {
				await axios({
					method: 'post',
					url: `${API_BASE}/${USERS_PATH}`,
					headers: {},
					data: {
						user: {
							username: username.trim(),
							email: email.toLowerCase().trim(),
							password: password.trim(),
						},
					},
				});
			},
		})
	);
};

export const fetchUpdateUser = body => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				await axios.put(
					`${API_BASE}/${USER_PATH}`,
					{
						user: { ...body },
					},
					{
						headers: {
							Authorization: API_KEY,
						},
					}
				);

				const user = await axios.get(`${API_BASE}/${USER_PATH}`, {
					headers: {
						Authorization: API_KEY,
					},
				});

				localStorage.setItem('user', JSON.stringify(user.data.user.token));
				localStorage.setItem('isAuth', JSON.stringify(true));
				return user.data.user;
			},
			option: setUser,
		})
	);
};

export const fetchAddLike = slug => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				const res = await axios.post(
					`${API_BASE}/${ARTICLES_PATH}/${slug}/${FAVORITE_PATH}`,
					{},
					{
						headers: {
							Authorization: API_KEY,
						},
					}
				);
				return res.data;
			},
			option: setArticleDetail,
		})
	);
};

export const fetchDeleteLike = slug => async (dispatch, getState) => {
	const state = getState();
	const API_KEY = `Token ${state.user.user.token}`;

	dispatch(
		fetchData({
			action: async () => {
				const res = await axios.delete(`${API_BASE}/${ARTICLES_PATH}/${slug}/${FAVORITE_PATH}`, {
					headers: {
						Authorization: API_KEY,
					},
				});

				return res.data;
			},
			option: setArticleDetail,
		})
	);
};

export const fetchCurrentUser = token => async dispatch => {
	dispatch(
		fetchData({
			action: async () => {
				const res = await axios.get(`${API_BASE}/${USER_PATH}`, {
					headers: {
						Authorization: `Token ${token}`,
					},
				});

				return res.data.user;
			},
			option: setUser,
		})
	);
};
