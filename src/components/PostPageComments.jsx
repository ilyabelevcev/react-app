import React from 'react';
import PostPageComment from './PostPageComment';

const PostPageComments = ({comments}) => {
    return (
        <div className='post-item__comments'>
            {
                comments.map(comment => 
                    <PostPageComment
                        style={{marginTop: '15px'}}
                        key={comment.id}
                        comment={comment}
                    />
                )
            }
        </div>
    );
}

export default PostPageComments;
