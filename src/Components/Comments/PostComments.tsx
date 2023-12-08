import React, { useEffect, useState } from 'react';

import { CommentService } from '../../api/services/CommentSerivce/CommentService';
import { CommentModel } from '../../api/services/CommentSerivce/interfaces';
import { FormattedUsers } from '../../api/services/UsersService/interfaces';

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
		CommentService.getComments(postId)
			.then((response) => {
				setComments(response);
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
			<div className="comments-count">
				<span
					onClick={(event) => {
						if (!postsPage) return;
						event.stopPropagation();
						setShowComments((prevState) => !prevState);
					}}
				>
					{postsPage && (showComments ? 'Hide' : 'Show')} Comments ({comments.length})
				</span>
			</div>

			{showComments &&
				comments.map((comment) => {
					return <CommentItem key={comment.id} comment={comment} users={users} />;
				})}
		</>
	);
};

export default PostComments;
