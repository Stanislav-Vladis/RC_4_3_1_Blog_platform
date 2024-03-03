import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Verify from '../components/ui/Verify';
import { fetchArticleDetail } from '../services/fetchData';
import ArticleDetail from '../components/article/ArticleDetail';

const ArticleDetailPage = () => {
	const { slug } = useParams();
	const dispatch = useDispatch();

	const { article } = useSelector(state => state.article);
	const { status, errors } = useSelector(state => state.server);
	const { isAuth } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(fetchArticleDetail(slug));
	}, [slug, isAuth]);

	return (
		<Verify status={status} errors={errors}>
			{Object.keys(article).length !== 0 ? <ArticleDetail {...article} /> : null}
		</Verify>
	);
};

export default ArticleDetailPage;
