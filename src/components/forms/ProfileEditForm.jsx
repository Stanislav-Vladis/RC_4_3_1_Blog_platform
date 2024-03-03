import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Label from '../ui/Label';
import Form from '../ui/Form';
import { fetchUpdateUser } from '../../services/fetchData';
import Verify from '../ui/Verify';

const ProfileEditForm = () => {
	const dispatch = useDispatch();
	const { status, errors: serverErrors } = useSelector(state => state.server);
	const { user } = useSelector(state => state.user);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		const res = { ...data };
		for (const key in res) {
			if (key === 'password' && res[key] === '') {
				delete res[key];
			} else if (key === 'image' || key === 'password') {
				res[key] = res[key].replace(/\s/g, '');
			}
			if (typeof res[key] === 'string') {
				res[key] = res[key].trim();
			}
		}
		dispatch(fetchUpdateUser(res));
	};

	const serverErrorCheck = !!Object.keys(serverErrors).length;

	return (
		<Verify status={status} errors={serverErrors}>
			<Form onSubmit={handleSubmit(onSubmit)} title='Edit Profile' btnText='Save' signIn>
				<Label title='Username'>
					<input
						className={`input ${(errors.username || (serverErrorCheck && serverErrors.data.username)) && 'error'}`}
						type='text'
						placeholder='Username'
						defaultValue={user.username}
						{...register('username', {
							required: 'Username is required',
							minLength: {
								value: 3,
								message: 'Your username needs to be at least 3 characters.',
							},
							maxLength: {
								value: 20,
								message: 'Maximum username length is 20 characters',
							},
						})}
					/>
					{errors.username && <span>{errors.username.message}</span>}
					{serverErrorCheck && serverErrors.data.username && (
						<span>Username {serverErrors.data.username}</span>
					)}
				</Label>
				<Label title='Email address'>
					<input
						className={`input ${(errors.email || (serverErrorCheck && serverErrors.data.email)) && 'error'}`}
						placeholder='Email address'
						defaultValue={user.email}
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
								message: 'Incorrect email address!',
							},
						})}
					/>
					{errors.email && <span>{errors.email.message}</span>}
					{serverErrorCheck && serverErrors.data.email && <span>Email {serverErrors.data.email}</span>}
				</Label>
				<Label title='New password'>
					<input
						className={`input ${errors.password && 'error'}`}
						type='password'
						placeholder='Password'
						defaultValue={user.password}
						{...register('password', {
							minLength: {
								value: 6,
								message: 'Your password needs to be at least 6 characters.',
							},
							maxLength: {
								value: 40,
								message: 'Maximum username length is 40 characters',
							},
						})}
					/>
					{errors.password && <span>{errors.password.message}</span>}
				</Label>
				<Label title='Avatar image (url)'>
					<input
						type='text'
						className={`input ${errors.image && 'error'}`}
						placeholder='Avatar image'
						defaultValue={user.image || ''}
						{...register('image', {
							pattern: {
								value: /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi, // eslint-disable-line
								message: 'Incorrect URL address',
							},
						})}
					/>
					{errors.image && <span>{errors.image.message}</span>}
				</Label>
			</Form>
		</Verify>
	);
};

export default ProfileEditForm;
