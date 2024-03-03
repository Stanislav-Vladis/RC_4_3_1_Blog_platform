import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import SignInForm from '../components/forms/SignInForm';

const SignIn = () => {
	const { isAuth } = useSelector(state => state.user);

	const savedUser = JSON.parse(localStorage.getItem('user'));
	if (Object.keys(savedUser).length !== 0 || isAuth) {
		return <Navigate to='/' replace />;
	}

	return <SignInForm />;
};

export default SignIn;
