import { useForm } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

import Label from '../ui/Label';
import Form from '../ui/Form';
import Verify from '../ui/Verify';

const ArticleForm = ({ title, newArticle, updateArticle }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const [tagList, setTagList] = useState([]);
	const [tagValue, setTagValue] = useState('');
	const refAddTagInput = useRef();
	const { status, errors: serverErrors } = useSelector(state => state.server);
	const { article, slug, edit } = useSelector(state => state.article);
	const navigate = useNavigate();

	useEffect(() => {
		if (refAddTagInput.current) {
			refAddTagInput.current.focus();
		}
	}, [tagList]);

	useEffect(() => {
		if (status === 'completed') {
			navigate(`/articles/${slug}`);
		}
	}, [status, slug]);

	useEffect(() => {
		if (edit) {
			setTagList(article.tagList);
		}
	}, []);

	const onSubmit = async data => {
		if (data.tagList) {
			data.tagList = data.tagList.filter(tag => tag !== '');
		}
		edit ? updateArticle(data) : newArticle(data);
	};

	const handleAddTag = tag => {
		if (tag.trim() !== '') {
			setTagList(prev => [...prev, tag.trim()]);
			setTagValue('');
		}
	};

	const handleDeleteTag = id => {
		setTagList(prev => {
			const idx = prev.findIndex((el, i) => i === id);
			return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
		});
		setValue(
			'tagList',
			tagList.filter((_, i) => i !== id)
		);
	};

	return (
		<Verify status={status} errors={serverErrors}>
			<Form className='form-article' btnText='Send' title={title} onSubmit={handleSubmit(onSubmit)}>
				<div className='form-article__main'>
					<Label title='Title'>
						<input
							type='text'
							placeholder='Title'
							defaultValue={edit ? article.title : ''}
							className={`input ${errors.title && 'error'}`}
							{...register('title', {
								required: 'Title is required',
							})}
						/>
						{errors.title && <span>{errors.title.message}</span>}
					</Label>
					<Label title='Short description'>
						<input
							type='text'
							placeholder='Description'
							defaultValue={edit ? article.description : ''}
							className={`input ${errors.description && 'error'}`}
							{...register('description', {
								required: 'Description is required',
							})}
						/>
						{errors.description && <span>{errors.description.message}</span>}
					</Label>
					<Label title='Text'>
						<textarea
							placeholder='Text'
							defaultValue={edit ? article.body : ''}
							className={`input textarea ${errors.body && 'error'}`}
							{...register('body', {
								required: 'Text is required',
							})}
						/>
						{errors.body && <span>{errors.body.message}</span>}
					</Label>
				</div>
				<div className='form-article__footer'>
					<p>Tags</p>
					<div className='form-article__tags'>
						{tagList &&
							tagList.map((el, i) => (
								<div key={`${i}__${el}`} className='tag-item'>
									<input
										type='text'
										placeholder='Tag'
										className='input'
										defaultValue={el}
										{...register(`tagList[${i}]`)}
									/>
									<Button danger onClick={() => handleDeleteTag(i)}>
										Delete
									</Button>
								</div>
							))}
						<div className='tag-item'>
							<input
								ref={refAddTagInput}
								type='text'
								placeholder='Tag'
								className='input'
								onChange={evt => setTagValue(evt.target.value)}
								value={tagValue}
							/>
							<Button onClick={() => handleAddTag(tagValue)}>Add tag</Button>
						</div>
					</div>
				</div>
			</Form>
		</Verify>
	);
};
export default ArticleForm;
