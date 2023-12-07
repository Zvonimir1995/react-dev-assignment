import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { CommentModel, FormattedUsers } from '../../Interfaces/interfaces';

import CommentItem from './CommentItem';

type Props = {
	postId: number;
	users: FormattedUsers;
};

const PostComments = ({ postId, users }: Props) => {
	const [comments, setComments] = useState<CommentModel[]>();
	const [commentsLoading, setCommentsLoading] = useState(true);

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
			{comments.map((comment) => {
				return <CommentItem key={comment.id} comment={comment} users={users} />;
			})}
		</>
	);
};

export default PostComments;
