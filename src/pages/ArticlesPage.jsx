import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import ArticleList from '../components/article-list';
import { setCurrentPage } from '../redux/slices/articlesList.slice';
import { fetchArticlesList } from '../services/fetchData';

const ArticlesPage = () => {
	const dispatch = useDispatch();
	const { currentPage, totalArticles } = useSelector(state => state.articlesList);
	const { article } = useSelector(state => state.article);
	const { isAuth } = useSelector(state => state.user);
	const [pageSize, setPageSize] = useState(5);

	useEffect(() => {
		dispatch(fetchArticlesList({ currentPage, pageSize }));
	}, [currentPage, pageSize, isAuth, article]);

	return (
		<>
			<ArticleList />
			<div className='pagination'>
				<Pagination
					current={currentPage}
					onShowSizeChange={(cur, size) => setPageSize(size)}
					defaultPageSize={5}
					total={totalArticles}
					pageSize={pageSize}
					onChange={evt => dispatch(setCurrentPage(evt))}
				/>
			</div>
		</>
	);
};

export default ArticlesPage;
