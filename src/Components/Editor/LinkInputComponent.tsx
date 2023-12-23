import React from 'react';

import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import CustomModal from '../Modal/CustomModal';
import Card from '../shared/Card/Card';

const LinkInputComponent = ({
	closeModal,
	addLink
}: {
	closeModal: () => void;
	addLink: ({ link, text }: { link: string; text: string }) => void;
}) => {
	const urlRegex = /^[a-z]+:\/\//;

	const validationSchema = Yup.object().shape({
		text: Yup.string().required(),
		link: Yup.string().required()
	});
	const formik = useFormik({
		initialValues: {
			text: '',
			link: ''
		},
		validationSchema: validationSchema,
		onSubmit: (data) => {
			let properLink = data.link;

			if (!data.link.match(urlRegex)) {
				properLink = 'http://' + data.link;
			}
			addLink({
				text: data.text,
				link: properLink
			});
			closeModal();
		}
	});

	return (
		<CustomModal closeModal={closeModal}>
			<Card title={'Add Link'}>
				<div
					style={{
						marginBottom: '1rem',
						padding: '1rem 0.5rem'
					}}
				>
					<div className="input-link-field-container">
						<span className="input-link-field-name">Text</span>
						<TextField
							className="input-link-field"
							value={formik.values.text}
							name="text"
							autoFocus
							size="small"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.text && Boolean(formik.errors.text)}
						/>
					</div>
					<div className="input-link-field-container">
						<span className="input-link-field-name">Link</span>
						<TextField
							className="input-link-field"
							value={formik.values.link}
							name="link"
							size="small"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.link && Boolean(formik.errors.link)}
						/>
					</div>
					<div className="input-link-action-buttons-container">
						<Button variant="contained" type="submit" onClick={() => formik.handleSubmit()}>
							Add
						</Button>

						<Button variant="outlined" color="error" type="button" onClick={closeModal}>
							Cancel
						</Button>
					</div>
				</div>
			</Card>
		</CustomModal>
	);
};

export default LinkInputComponent;
