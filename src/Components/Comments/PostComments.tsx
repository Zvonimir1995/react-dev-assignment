import React, { useEffect, useState } from 'react';

import { CommentService } from '../../api/services/CommentSerivce/CommentService';
import { CommentModel } from '../../api/services/CommentSerivce/interfaces';
import { useGreetFromComponent } from '../../global/greetFromCmpHook';

import CommentItem from './CommentItem';

type Props = {
	postId: number;
	isPostsPage?: boolean;
	helloMessage?: string;
};

const PostComments = ({ postId, isPostsPage, helloMessage }: Props) => {
	const [comments, setComments] = useState<CommentModel[]>();
	const [commentsLoading, setCommentsLoading] = useState(true);
	const [showComments, setShowComments] = useState(!isPostsPage);

	useGreetFromComponent(helloMessage, 'PostComments.tsx');

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
						if (!isPostsPage) return;
						event.stopPropagation();
						setShowComments((prevState) => !prevState);
					}}
				>
					{isPostsPage && (showComments ? 'Hide' : 'Show')} Comments ({comments.length})
				</span>
			</div>

			{showComments &&
				comments.map((comment) => {
					return <CommentItem key={comment.id} comment={comment} />;
				})}
		</>
	);
};

export default PostComments;
