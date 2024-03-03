import { Spin, Alert, Button } from 'antd';

import style from './Verify.module.scss';

const Verify = ({ status, errors, children }) => {
	return (
		<>
			{status === 'loading' && (
				<div className={style.loading}>
					<Spin size='large' />
				</div>
			)}
			{(status === 'completed' || status === 'waiting') && children}
			{status === 'error' && (
				<Alert
					message={`Ошибка! ${errors.message}`}
					description='Перезагрузите страницу или попробуйте позже.'
					type='error'
					showIcon
					action={
						<Button size='large' onClick={() => window.location.reload()}>
							Reload
						</Button>
					}
				/>
			)}
		</>
	);
};

export default Verify;
