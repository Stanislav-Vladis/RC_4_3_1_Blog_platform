import { Alert, Button } from 'antd';

import style from './InternetError.module.scss';

const InternetError = () => {
	return (
		<div className={style.internet}>
			<Alert
				message='Ошибка! Отсутствует подключение к интернету.'
				description='Пожалуйста, проверьте подключение к интернету'
				type='error'
				showIcon
				action={
					<Button size='large' onClick={() => window.location.reload()}>
						Reload
					</Button>
				}
			/>
		</div>
	);
};

export default InternetError;
