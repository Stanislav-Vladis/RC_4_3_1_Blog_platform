import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import defaultAvatar from '../../assets/default-avatar.jpg';
import { setDeleteArticle, setEditArticle, setUserArticle } from '../../redux/slices/article.slice';
import { fetchAddLike, fetchArticleDelete, fetchDeleteLike } from '../../services/fetchData';

const ArticleDetail = props => {
	const [avatar, setAvatar] = useState(props.author.image);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { article, userArticle, slug, deleteArticle } = useSelector(state => state.article);
	const { user, isAuth } = useSelector(state => state.user);

	useEffect(() => {
		if (user.username === article.author.username) {
			dispatch(setUserArticle(true));
		} else {
			dispatch(setUserArticle(false));
		}
	}, []);

	useEffect(() => {
		if (deleteArticle) {
			navigate('/');
			dispatch(setDeleteArticle(false));
		}
	}, [deleteArticle]);

	const handleEditClick = () => {
		dispatch(setEditArticle(true));
		navigate(`/articles/${slug}/edit`);
	};

	const handleDelete = () => {
		dispatch(fetchArticleDelete(slug));
	};

	const handleAvatarError = () => {
		setAvatar(defaultAvatar);
	};

	const handleLike = () => {
		if (props.favorited) {
			dispatch(fetchDeleteLike(slug));
		} else {
			dispatch(fetchAddLike(slug));
		}
	};

	return (
		<div className='article article--detail'>
			<div className='article__inner'>
				<div className='article__wrapper'>
					<div className='article__content'>
						<div className='article__header'>
							<h3 className='article__title' title={props.title || ''}>
								{props.title || ''}
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
								<strong>{props.favoritesCount || 0}</strong>
							</button>
						</div>
						<ul className='article__tags'>
							{props.tagList &&
								props.tagList.map((tag, id) => (
									<li className='tag' key={`${id}__${tag}`} title={tag}>
										{tag}
									</li>
								))}
						</ul>
					</div>
					<div className='article__author'>
						<div className='article__author-info'>
							<div className='article__author-name'>{props.author.username || ''}</div>
							<div className='article__date'>{format(new Date(props.createdAt), 'MMMM d, yyyy')}</div>
						</div>
						<div className='article__author-image'>
							<img src={avatar || defaultAvatar} onError={handleAvatarError} alt='avatar' />
						</div>
					</div>
				</div>
				<div className='article__actions'>
					<div className='article__description'>{props.description || ''}</div>
					{userArticle && (
						<div className='article__buttons'>
							<Popconfirm
								placement='right'
								description='Are you sure to delete this task?'
								okText='Yes'
								cancelText='No'
								onConfirm={handleDelete}
							>
								<Button danger>Delete</Button>
							</Popconfirm>
							<button onClick={handleEditClick} className='create-article-btn'>
								Edit
							</button>
							<div className='del-popup'>
								<div className='del-popup__top'></div>
								<div className='del-popup__bottom'></div>
							</div>
						</div>
					)}
				</div>
				<div className='article__body'>
					<Markdown>{props.body || ''}</Markdown>
				</div>
			</div>
		</div>
	);
};
export default ArticleDetail;
