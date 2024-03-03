import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import SignUpForm from '../components/forms/SignUpForm';

const SignUp = () => {
	const { isAuth } = useSelector(state => state.user);

	const savedUser = JSON.parse(localStorage.getItem('user'));
	if (Object.keys(savedUser).length !== 0 || isAuth) {
		return <Navigate to='/' replace />;
	}

	return <SignUpForm />;
};

export default SignUp;
