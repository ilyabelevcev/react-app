import React from 'react';

const PostPageItem = ({post}) => {
    return (
        <div className='post-item__content'>
            <h3 className='post-content__heading'>{post.id}. {post.title}</h3>
            <p className='post-content__descr'>{post.body}</p>
        </div>
    );
}

export default PostPageItem;
