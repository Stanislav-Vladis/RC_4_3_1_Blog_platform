import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const Form = ({ className, title, btnText, checkbox, footer, onSubmit, signUp, signIn, children }) => {
	const [checked, setChecked] = useState(true);

	return (
		<form className={`${className || ''} form`} onSubmit={onSubmit}>
			<div className='form__inner'>
				<div className='form__title'>{title}</div>
				<div className='form__content'>{children}</div>
				<div className='form__footer'>
					{checkbox && (
						<label className='label--footer'>
							<Checkbox onChange={evt => setChecked(evt.target.checked)} checked={checked} />
							<p>I agree to the processing of my personal information</p>
						</label>
					)}
					<button className='form__submit' disabled={!checked}>
						{btnText}
					</button>
					{footer && (
						<p className='form__footer-check'>
							{signUp && (
								<span>
									Already have an account? <Link to='/sign-in'>Sign In.</Link>
								</span>
							)}
							{signIn && (
								<span>
									Don’t have an account? <Link to='/sign-up'>Sign Up.</Link>
								</span>
							)}
						</p>
					)}
				</div>
			</div>
		</form>
	);
};

export default Form;
