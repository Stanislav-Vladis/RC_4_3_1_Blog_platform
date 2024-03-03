import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArticleForm from '../components/forms/ArticleForm';
import { fetchArticleUpdate } from '../services/fetchData';
import { setEditArticle } from '../redux/slices/article.slice';

const EditArticle = () => {
	const { isAuth } = useSelector(state => state.user);
	const { slug } = useSelector(state => state.article);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const savedUser = JSON.parse(localStorage.getItem('user'));
		if (Object.keys(savedUser).length === 0 || !isAuth) {
			navigate('/sign-in');
		}
	}, [isAuth]);

	const updateArticle = async data => {
		dispatch(fetchArticleUpdate({ data, slug }));
		dispatch(setEditArticle(false));
	};

	return <ArticleForm title='Edit article' updateArticle={updateArticle} />;
};

export default EditArticle;
