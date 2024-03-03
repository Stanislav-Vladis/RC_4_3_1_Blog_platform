import { Link } from 'react-router-dom';

import style from './NotFound.module.scss';

const NotFound = () => {
	return (
		<div className={style['not-found']}>
			<div className={style['not-found__inner']}>
				<h1>Ошибка 404</h1>
				<p>Страница не найдена</p>
				<Link to='/' className='create-article-btn'>
					Вернуться на главную страницу
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
