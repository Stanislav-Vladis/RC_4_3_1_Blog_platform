import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { logOutUser } from '../../redux/slices/user.slice';
import defaultAvatar from '../../assets/default-avatar.jpg';

import style from './Header.module.scss';

const HeaderIsAuth = ({ username, image }) => {
	const [avatar, setAvatar] = useState(image);
	const dispatch = useDispatch();

	const handleLogOut = () => {
		dispatch(logOutUser());

		const savedUser = JSON.parse(localStorage.getItem('user'));
		if (Object.keys(savedUser).length !== 0) {
			localStorage.setItem('user', JSON.stringify({}));
			localStorage.setItem('isAuth', JSON.stringify(true));
		}
	};

	const handleAvatarError = () => {
		setAvatar(defaultAvatar);
	};

	return (
		<div className={style['header__auth']}>
			<Link to='/new-article' className='create-article-btn'>
				Create article
			</Link>
			<Link to='/profile' className={style['header__author']}>
				<p>{username}</p>
				<div className={style['header__author-img']}>
					<img src={avatar || defaultAvatar} onError={handleAvatarError} alt='avatar' />
				</div>
			</Link>
			<button className='log-out-btn' onClick={handleLogOut}>
				Log out
			</button>
		</div>
	);
};

export default HeaderIsAuth;
