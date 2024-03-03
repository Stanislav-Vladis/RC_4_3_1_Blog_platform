import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import ProfileEditForm from '../components/forms/ProfileEditForm';

const Profile = () => {
	const { isAuth } = useSelector(state => state.user);

	const savedUser = JSON.parse(localStorage.getItem('user'));
	if (Object.keys(savedUser).length === 0 || !isAuth) {
		return <Navigate to='/sign-in' replace />;
	}

	return <ProfileEditForm />;
};

export default Profile;
