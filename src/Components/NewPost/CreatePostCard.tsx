import React, { useState } from 'react';

import { Avatar } from '@mui/material';

import './styles.css';
import CreatePostModal from './CreatePostModal';

const CreatePostCard = () => {
	const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
	const openCreatePostModal = () => {
		setCreatePostModalOpen(true);
	};

	return (
		<>
			<div className="create_post_card">
				<Avatar className="create_post_avatar" src={''}>
					U
				</Avatar>

				<div onClick={openCreatePostModal} className="create_post_placeholder">
					{'Write something here...'}
				</div>
			</div>
			{createPostModalOpen && (
				<CreatePostModal closeModal={setCreatePostModalOpen.bind(null, false)} />
			)}
		</>
	);
};

export default CreatePostCard;
