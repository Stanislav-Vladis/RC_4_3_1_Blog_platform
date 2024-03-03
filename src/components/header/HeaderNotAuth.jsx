import React from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

const HeaderNotAuth = () => {
	return (
		<div className={style['header__buttons']}>
			<Link to='/sign-in' className='sign-in-btn'>
				Sign In
			</Link>
			<Link to='/sign-up' className='sign-up-btn'>
				Sign Up
			</Link>
		</div>
	);
};

export default HeaderNotAuth;
