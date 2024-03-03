import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import HeaderNotAuth from './HeaderNotAuth';
import HeaderIsAuth from './HeaderIsAuth';
import style from './Header.module.scss';

const Header = () => {
	const { user, isAuth } = useSelector(state => state.user);
	console.log(user);
	return (
		<header className={style.header}>
			<div className={style['header__inner']}>
				<Link to='/' className={style['header__logo']}>
					Realworld Blog
				</Link>
				{isAuth ? <HeaderIsAuth {...user} /> : <HeaderNotAuth />}
			</div>
		</header>
	);
};

export default Header;

// onClick = { handleLogOut };
