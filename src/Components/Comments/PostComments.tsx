import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { CommentModel, FormattedUsers } from '../../Interfaces/interfaces';

import CommentItem from './CommentItem';

type Props = {
	postId: number;
	users: FormattedUsers;
	postsPage?: boolean;
};

const PostComments = ({ postId, users, postsPage }: Props) => {
	const [comments, setComments] = useState<CommentModel[]>();
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [showComments, setShowComments] = useState(!postsPage);

	useEffect(() => {
		axios
			.get<CommentModel[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
			.then((response) => {
				setComments(response.data);
				setCommentsLoading(false);
			})
			.catch(() => {
				setCommentsLoading(false);
			});
	}, [postId]);

	if (commentsLoading || !comments) {
		return <></>;
	}

	return (
		<>
			<div
				onClick={(event) => {
					if (!postsPage) return;
					event.stopPropagation();
					setShowComments((prevState) => !prevState);
				}}
				className="comments-count"
			>
				Comments ({comments.length})
			</div>

			{showComments &&
				comments.map((comment) => {
					return <CommentItem key={comment.id} comment={comment} users={users} />;
				})}
		</>
	);
};

export default PostComments;
