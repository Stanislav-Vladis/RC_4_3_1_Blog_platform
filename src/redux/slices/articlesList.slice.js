// eslint-disable-next-line import/namespace
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],
	totalArticles: 0,
	currentPage: 1,
};

export const articlesListSlice = createSlice({
	name: 'articlesList',
	initialState,
	reducers: {
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setArticlesList(state, action) {
			state.items = action.payload.articles;
			state.totalArticles = action.payload.articlesCount;
		},
	},
});

export const { setCurrentPage, setArticlesList } = articlesListSlice.actions;
export default articlesListSlice.reducer;
