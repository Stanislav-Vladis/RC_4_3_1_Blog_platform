import { Navigate } from 'react-router-dom';

import ProfileEditForm from '../components/forms/ProfileEditForm';

const Profile = () => {
	const savedUser = JSON.parse(localStorage.getItem('user'));
	const isAuth = JSON.parse(localStorage.getItem('isAuth'));
	if (Object.keys(savedUser).length === 0 || !isAuth) {
		return <Navigate to='/sign-in' replace />;
	}

	return <ProfileEditForm />;
};

export default Profile;
