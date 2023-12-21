import React, { useState } from 'react';

import { useGreetFromComponent } from '../../global/greetFromCmpHook';
import { useComments } from '../../rq/hooks/commentsHook';

import CommentItem from './CommentItem';

type Props = {
	postId: number;
	isPostsPage?: boolean;
	helloMessage?: string;
};

const PostComments = ({ postId, isPostsPage, helloMessage }: Props) => {
	const [showComments, setShowComments] = useState(!isPostsPage);

	useGreetFromComponent(helloMessage, 'PostComments.tsx');

	const { data: comments } = useComments(postId);

	if (!comments) {
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
