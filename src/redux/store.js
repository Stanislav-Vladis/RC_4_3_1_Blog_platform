// eslint-disable-next-line import/namespace
import { configureStore } from '@reduxjs/toolkit';

import user from './slices/user.slice';
import articlesList from './slices/articlesList.slice';
import article from './slices/article.slice';
import server from './slices/serverStatus.slice';

const store = configureStore({
	reducer: { user, articlesList, article, server },
});

export default store;
