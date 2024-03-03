// eslint-disable-next-line import/namespace
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	article: {},
	userArticle: false,
	favorite: false,
	slug: '',
	edit: false,
	deleteArticle: false,
};

export const articleSlice = createSlice({
	name: 'article',
	initialState,
	reducers: {
		setNullArticle(state) {
			state.article = {};
			state.userArticle = false;
			state.slug = '';
			state.edit = false;
			state.favorite = false;
		},
		setArticleDetail(state, action) {
			state.article = action.payload.article;
			state.slug = action.payload.article.slug;
		},
		setCurrentSlug(state, action) {
			state.slug = action.payload.article.slug;
		},
		setUserArticle(state, action) {
			state.userArticle = action.payload;
		},
		setEditArticle(state, action) {
			state.edit = action.payload;
		},
		setDeleteArticle(state, action) {
			state.deleteArticle = action.payload;
		},
	},
});

export const { setNullArticle, setArticleDetail, setCurrentSlug, setUserArticle, setEditArticle, setDeleteArticle } =
	articleSlice.actions;
export default articleSlice.reducer;
