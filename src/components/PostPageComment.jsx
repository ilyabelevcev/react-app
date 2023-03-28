import React from 'react';

const PostPageComment = ({comment, ...props}) => {
    return (
        <div {...props} className='post-item__comment'>
            <h4 className='post-comment__email'>{comment.email}</h4>
            <div className='post-comment__heading'>{comment.name}</div>
            <div className='post-comment__descr'>{comment.body}</div>
        </div>
    );
}

export default PostPageComment;
