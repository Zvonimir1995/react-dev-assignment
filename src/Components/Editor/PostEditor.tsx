import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Editor } from '@tiptap/core';
import { EditorContent } from '@tiptap/react';

import PostEditorToolbar from './PostEditorToolbar';
import useFullEditor from './useFullEditor';

import './styles.css';

type Props = {
	onSubmit: (editor: Editor | null) => void;
	creatingPost: boolean;
};

const PostEditor = ({ onSubmit, creatingPost }: Props) => {
	const [toolbarVisible, setToolbarVisible] = useState(false);
	const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);

	const removeCommentToolbar = () => setToolbarVisible(false);
	const addCommentToolbar = () => setToolbarVisible(true);

	const editor = useFullEditor({
		placeholder: 'Share something with this awesome community...',
		autofocus: true
	});

	useEffect(() => {
		// keep the toolbar if we opened a modal from the toolbar
		if (!editor?.isFocused && !addLinkModalOpen && toolbarVisible) {
			removeCommentToolbar();
		}
	}, [editor?.isFocused, addLinkModalOpen, toolbarVisible]);

	return (
		<div className="">
			<div className="post-editor-container">
				<EditorContent className="editor-content" onFocus={addCommentToolbar} editor={editor} />
				<div
					onClick={() => {
						editor?.commands.focus();
					}}
					onMouseDown={(event) => event.preventDefault()}
					style={{
						height: '2.25rem'
					}}
				></div>

				{toolbarVisible && (
					<div className="editor-toolbar">
						<PostEditorToolbar
							editor={editor}
							addLinkModalOpen={addLinkModalOpen}
							setAddLinkModalOpen={setAddLinkModalOpen}
						/>
					</div>
				)}
			</div>
			<div className="post-action-button-container">
				{creatingPost ? (
					<div
						style={{
							width: '4.5rem',
							height: '2.25rem'
						}}
					>
						<CircularProgress size={30} />
					</div>
				) : (
					<Button
						variant="contained"
						disabled={editor?.isEmpty}
						onClick={onSubmit.bind(this, editor)}
					>
						Post
					</Button>
				)}
			</div>
		</div>
	);
};

export default PostEditor;
