import React from 'react';

import { CommentModel } from '../../api/services/CommentSerivce/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';

import './styles.css';

type Props = {
	comment: CommentModel;
	users: FormattedUsers;
};

const CommentItem = ({ comment }: Props) => {
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
