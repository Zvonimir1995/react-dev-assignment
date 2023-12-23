import React, { useMemo } from 'react';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ListIcon from '@mui/icons-material/List';
import { Tooltip } from '@mui/material';
import { Editor } from '@tiptap/react';
import clsx from 'clsx';

import LinkInputComponent from './LinkInputComponent';

type Props = {
	editor: Editor | null;
	addLinkModalOpen: boolean;
	setAddLinkModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostEditorToolbar = ({ editor, addLinkModalOpen, setAddLinkModalOpen }: Props) => {
	const addLink = ({ link, text }: { link: string; text: string }) => {
		editor?.commands.insertContent(`<a href=${link} target="_blank">${text}</a> `);
	};

	const toolbarItems = useMemo(() => {
		return [
			{
				name: 'bold',
				tooltip: 'Bold',
				onClick: () => editor?.commands.toggleBold(),
				icon: <FormatBoldIcon />
			},
			{
				name: 'italic',
				tooltip: 'Italic',
				onClick: () => editor?.commands.toggleItalic(),
				icon: <FormatItalicIcon />
			},
			{
				name: 'underline',
				tooltip: 'Underline',
				onClick: () => editor?.commands.toggleUnderline(),
				icon: <FormatUnderlinedIcon />
			},
			{
				name: 'bulletList',
				tooltip: 'Bullet list',
				onClick: () => editor?.chain().focus().toggleBulletList().run(),
				icon: <ListIcon />
			},
			{
				name: 'orderedList',
				tooltip: 'Ordered list',
				onClick: () => editor?.commands.toggleOrderedList(),
				icon: <FormatListNumberedIcon onMouseDown={(event) => event.preventDefault()} />
			},
			{
				name: 'insert_link',
				tooltip: 'Insert Link',
				onClick: () => setAddLinkModalOpen(true),
				icon: <InsertLinkIcon />
			}
		];
	}, [editor, setAddLinkModalOpen]);

	return (
		<div className="toolbar-items-container">
			{toolbarItems.map((item) => {
				return (
					<div
						key={item.name}
						onClick={() => {
							item.onClick();
						}}
						onMouseDown={(event) => {
							event.preventDefault();
						}}
						className={clsx({
							'toolbar-item': true,
							active: editor?.isActive(item.name),
							inactive: !editor?.isActive(item.name)
						})}
					>
						<Tooltip
							disableInteractive
							title={
								<span
									style={{
										fontSize: '1rem'
									}}
								>
									{item.tooltip}
								</span>
							}
						>
							{item.icon}
						</Tooltip>
					</div>
				);
			})}
			{addLinkModalOpen && (
				<LinkInputComponent closeModal={() => setAddLinkModalOpen(false)} addLink={addLink} />
			)}
		</div>
	);
};

export default PostEditorToolbar;
