import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleForm from '../components/forms/ArticleForm';
import { fetchArticleNew } from '../services/fetchData';
import { setEditArticle } from '../redux/slices/article.slice';

const NewArticle = () => {
	const { isAuth } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem('user'));
		if (Object.keys(savedUser).length === 0 || !isAuth) {
			navigate('/sign-in');
		}
	}, [isAuth]);

	const addNewArticle = async data => {
		dispatch(fetchArticleNew(data));
		dispatch(setEditArticle(false));
	};

	return <ArticleForm title='Create new article' newArticle={addNewArticle} />;
};

export default NewArticle;
