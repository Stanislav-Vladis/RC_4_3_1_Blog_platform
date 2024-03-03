import React from 'react';

const Label = ({ title, children }) => {
	return (
		<label className='label'>
			<p className='label__title'>{title}</p>
			{children}
		</label>
	);
};

export default Label;
