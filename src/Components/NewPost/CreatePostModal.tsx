import React from 'react';

import { Avatar } from '@mui/material';
import { Editor } from '@tiptap/core';

import { useGlobalStore } from '../../global/useStore';
import { useCreatePost } from '../../rq/hooks/postsHook';
import PostEditor from '../Editor/PostEditor';
import CustomModal from '../Modal/CustomModal';

type Props = {
	closeModal: VoidFunction;
};

const CreatePostModal = ({ closeModal }: Props) => {
	const { mutate: createNewPost, isLoading: creatingPost } = useCreatePost();

	const { swapNewlyCreatedPost } = useGlobalStore();

	const createNewPostHandler = (editor: Editor | null) => {
		createNewPost(
			{
				body: editor?.getHTML() ?? '',
				title: 'Your Created Post',
				userId: 11
			},
			{
				onSuccess: (resData) => {
					swapNewlyCreatedPost({
						...resData,
						customPost: true
					});
					closeModal();
				}
			}
		);
	};

	return (
		<CustomModal closeModal={closeModal}>
			<div className="create_post_modal">
				<div className="create_post_modal_header">
					<Avatar>U</Avatar>
					<h5>new user name</h5>
				</div>
				<PostEditor onSubmit={createNewPostHandler} creatingPost={creatingPost} />
			</div>
		</CustomModal>
	);
};

export default CreatePostModal;
