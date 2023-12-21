import React from 'react';

import { CommentModel } from '../../api/services/CommentSerivce/interfaces';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';

import './styles.css';

type Props = {
	comment: CommentModel;
	helloMessage?: string;
};

const CommentItem = ({ comment, helloMessage }: Props) => {
	useGreetFromComponent(helloMessage, 'CommentItem.tsx');

	return (
		<div className="comment-item">
			<p>
				<span className="comment-name">{comment.name}</span>
				<span>(&nbsp;{comment.email}&nbsp;)</span>
			</p>
			<p>{comment.body}</p>
		</div>
	);
};

export default CommentItem;
