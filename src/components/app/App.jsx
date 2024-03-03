import { Online, Offline } from 'react-detect-offline';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ArticlesPage from '../../pages/ArticlesPage';
import InternetError from '../ui/InternetError';
import Header from '../header';
import ArticleDetailPage from '../../pages/ArticleDetailPage';
import SignIn from '../../pages/SignIn';
import SignUp from '../../pages/SignUp';
import Profile from '../../pages/Profile';
import NewArticle from '../../pages/NewArticle';
import EditArticle from '../../pages/EditArticle';
import NotFound from '../../pages/NotFound/NotFound';
import { fetchCurrentUser } from '../../services/fetchData';

const App = () => {
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);

	useEffect(() => {
		if (!localStorage.getItem('user')) {
			localStorage.setItem('user', JSON.stringify({}));
		} else {
			const currentToken = JSON.parse(localStorage.getItem('user'));
			Object.keys(currentToken).length !== 0 ? dispatch(fetchCurrentUser(currentToken)) : null;
		}
	}, []);

	useEffect(() => {
		const currentUser = JSON.parse(localStorage.getItem('user'));
		if (Object.keys(currentUser).length === 0 && user.token) {
			localStorage.setItem('user', JSON.stringify(user.token));
		}
	}, [user]);

	return (
		<>
			<Header />
			<main>
				<section className='content'>
					<div className='container'>
						<div className='content__inner'>
							<Online>
								<Routes>
									<Route path='/' element={<ArticlesPage />} />
									<Route path='/articles' element={<ArticlesPage />} />
									<Route path='/articles/:slug' element={<ArticleDetailPage />} />
									<Route path='/articles/:slug/edit' element={<EditArticle />} />
									<Route path='/sign-in' element={<SignIn />} />
									<Route path='/sign-up' element={<SignUp />} />
									<Route path='/profile' element={<Profile />} />
									<Route path='/new-article' element={<NewArticle />} />
									<Route path='*' element={<NotFound />} />
								</Routes>
							</Online>
							<Offline>
								<InternetError />
							</Offline>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default App;
