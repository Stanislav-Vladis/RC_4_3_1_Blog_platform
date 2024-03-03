import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Label from '../ui/Label';
import Form from '../ui/Form';
import { fetchSignUpUser } from '../../services/fetchData';
import Verify from '../ui/Verify';
import { setWait } from '../../redux/slices/serverStatus.slice';

const SignUpForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { status, errors: serverErrors } = useSelector(state => state.server);
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = data => {
		dispatch(fetchSignUpUser(data));
	};

	useEffect(() => {
		if (status === 'completed') {
			reset();
			navigate('/sign-in');
		}
	}, [status]);

	useEffect(() => {
		return () => dispatch(setWait());
	}, []);

	const serverErrorCheck = !!Object.keys(serverErrors).length;

	return (
		<Verify status={status} errors={serverErrors}>
			<Form onSubmit={handleSubmit(onSubmit)} checkbox footer title='Create new account' btnText='Create' signUp>
				<Label title='Username'>
					<input
						className={`input ${(errors.username || (serverErrorCheck && serverErrors.data.username)) && 'error'}`}
						type='text'
						placeholder='Username'
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
				<Label title='Password'>
					<input
						className={`input ${errors.password && 'error'}`}
						type='password'
						placeholder='Password'
						{...register('password', {
							required: 'Password is required',
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
				<Label title='Repeat Password'>
					<input
						className={`input ${errors.passwordRepeat && 'error'}`}
						type='password'
						placeholder='Password'
						{...register('passwordRepeat', {
							required: true,
							validate: value => value === watch('password'),
						})}
					/>
					{errors.passwordRepeat && <span>{'Passwords must match'}</span>}
				</Label>
			</Form>
		</Verify>
	);
};

export default SignUpForm;
