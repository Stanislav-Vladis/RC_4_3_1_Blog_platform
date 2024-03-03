import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Label from '../ui/Label';
import Form from '../ui/Form';
import { fetchSignInUser } from '../../services/fetchData';
import Verify from '../ui/Verify';
import { setWait } from '../../redux/slices/serverStatus.slice';

const SignInForm = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { status, errors: serverErrors } = useSelector(state => state.server);

	const onSubmit = data => {
		dispatch(fetchSignInUser(data));
	};

	useEffect(() => {
		return () => dispatch(setWait());
	}, []);

	return (
		<Verify status={status} errors={serverErrors}>
			<Form onSubmit={handleSubmit(onSubmit)} footer title='Sign In' btnText='Login' signIn>
				<Label title='Email address'>
					<input
						className={`input ${(errors.email || serverErrors.data) && 'error'}`}
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
				</Label>
				<Label title='Password'>
					<input
						className={`input ${(errors.password || serverErrors.data) && 'error'}`}
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
				{serverErrors.data && <span className='error-text'>Email or password is invalid</span>}
			</Form>
		</Verify>
	);
};

export default SignInForm;
