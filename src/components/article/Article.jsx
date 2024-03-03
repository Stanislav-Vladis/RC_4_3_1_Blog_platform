import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import defaultAvatar from '../../assets/default-avatar.jpg';
import { fetchAddLike, fetchDeleteLike } from '../../services/fetchData';

const Article = props => {
	const { isAuth } = useSelector(state => state.user);
	const dispatch = useDispatch();

	const handleLike = () => {
		if (props.favorited) {
			dispatch(fetchDeleteLike(props.slug));
		} else {
			dispatch(fetchAddLike(props.slug));
		}
	};

	return (
		<li className='article'>
			<div className='article__inner'>
				<div className='article__content'>
					<div className='article__header'>
						<h3 className='article__title' title={props.title}>
							<Link to={`/articles/${props.slug}`}>{props.title}</Link>
						</h3>
						<button
							className={`${props.favorited ? 'article__like active' : 'article__like'}`}
							disabled={!isAuth}
							onClick={handleLike}
						>
							<span>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									viewBox='0 0 16 16'
									fill='none'
								>
									<path
										d='M8 3.56911C7.26154 2.33835 6.03077 1.47681 4.55385 1.47681C2.46154 1.47681 0.861542 3.07681 0.861542 5.16911C0.861542 9.23065 3.07693 9.84604 8 14.523C12.9231 9.84604 15.1385 9.23065 15.1385 5.16911C15.1385 3.07681 13.5385 1.47681 11.4462 1.47681C9.96923 1.47681 8.73846 2.33835 8 3.56911Z'
										fill='#FF0707'
									/>
								</svg>
							</span>
							<strong>{props.favoritesCount}</strong>
						</button>
					</div>
					<ul className='article__tags'>
						{props.tagList.map((tag, id) => (
							<li className='tag' key={`${id}__${tag}`} title={tag}>
								{tag}
							</li>
						))}
					</ul>
					<div className='article__description'>{props.description || ''}</div>
				</div>
				<div className='article__author'>
					<div className='article__author-info'>
						<div className='article__author-name'>{props.author.username || ''}</div>
						<div className='article__date'>{format(new Date(props.createdAt), 'MMMM d, yyyy')}</div>
					</div>
					<div className='article__author-image'>
						<img src={props.author.image || defaultAvatar} alt='avatar' />
					</div>
				</div>
			</div>
		</li>
	);
};

export default Article;
