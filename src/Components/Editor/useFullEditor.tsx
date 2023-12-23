import { useMemo } from 'react';

import { Editor } from '@tiptap/core';
import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { CodeBlock } from '@tiptap/extension-code-block';
import { Document } from '@tiptap/extension-document';
import { Highlight } from '@tiptap/extension-highlight';
import { Italic } from '@tiptap/extension-italic';
import { Link } from '@tiptap/extension-link';
import { ListItem } from '@tiptap/extension-list-item';
import { Mention } from '@tiptap/extension-mention';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Placeholder } from '@tiptap/extension-placeholder';
import { Text } from '@tiptap/extension-text';
import { Underline } from '@tiptap/extension-underline';
import { ReactRenderer, useEditor } from '@tiptap/react';
import tippy, { GetReferenceClientRect } from 'tippy.js';

import { useUsers } from '../../rq/hooks/usersHook';

import MentionList from './MentionList';

import './styles.css';

type Props = {
	content?: string;
	placeholder?: string;
	autofocus?: boolean;
};

const useFullEditor = ({ content = '', placeholder = '', autofocus = false }: Props) => {
	const { data: users } = useUsers();

	const usersArray = useMemo(() => {
		if (!users) return [];
		const array = Object.keys(users).map((key) => users[key]);
		console.log(array);
		return array;
	}, [users]);

	return useEditor(
		{
			autofocus: autofocus ? 'end' : false,
			extensions: [
				Document,
				Placeholder.configure({
					placeholder
				}),
				Paragraph,
				Text,
				Bold,
				OrderedList,
				Italic,
				BulletList,
				ListItem,
				CodeBlock,
				Highlight.configure({ multicolor: true }),
				Link.configure({
					openOnClick: true
				}),
				Underline,
				Mention.configure({
					HTMLAttributes: {
						class: 'mention'
					},
					renderLabel({ options, node }) {
						return `${options.suggestion.char}${node.attrs.label}`;
					},
					suggestion: {
						items: ({ query }: { editor: Editor; query: string }) => {
							return (
								usersArray?.filter((user) =>
									user.name.toLowerCase().includes(query.toLowerCase())
								) ?? []
							);
						},
						render: () => {
							//eslint-disable-next-line
							let component: any;
							//eslint-disable-next-line
							let popup: any;
							return {
								//eslint-disable-next-line
								onStart: (props: any) => {
									component = new ReactRenderer(MentionList, {
										props,
										editor: props.editor as Editor
									});
									// eslint-disable-next-line react/prop-types
									if (!props.clientRect) {
										return;
									}

									popup = tippy('body', {
										// eslint-disable-next-line react/prop-types
										getReferenceClientRect: props.clientRect as GetReferenceClientRect,
										appendTo: () => document.body,
										content: component.element,
										showOnCreate: true,
										interactive: true,
										trigger: 'manual',
										placement: 'bottom-start'
									});
								},
								//eslint-disable-next-line
								onUpdate(props: any) {
									component.updateProps(props);

									//eslint-disable-next-line react/prop-types
									if (!props.clientRect) {
										return;
									}

									popup[0].setProps({
										// eslint-disable-next-line react/prop-types
										getReferenceClientRect: props.clientRect
									});
								},
								//eslint-disable-next-line
								onKeyDown(props: any) {
									if (props.event.key === 'Escape') {
										event?.preventDefault();
										event?.stopPropagation();
										popup[0].hide();

										return true;
									}

									return component.ref?.onKeyDown(props);
								},

								onExit() {
									if (popup) {
										popup[0].destroy();
									}
									if (component) {
										component.destroy();
									}
								}
							};
						}
					}
				})
			],
			content
		},
		[usersArray]
	);
};

export default useFullEditor;
