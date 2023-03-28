import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import PostService from '../API/PostService';
import { useFetching } from '../hooks/useFetching';

import Loader from '../components/UI/loader/Loader';
import PostPageItem from '../components/PostPageItem';
import PostPageComments from '../components/PostPageComments';

const PostPage = () => {
    const params = useParams() 
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostById, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data)
    })
    const [fetchCommById, isCommLoading, commError] = useFetching(async () => {
        const response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data)
    })
    useEffect(() => {
        fetchPostById()
        fetchCommById()
    }, [])

    return (
        <div className='post-item'>
            {isPostLoading
                ? <Loader/>
                : <PostPageItem post={post}/>
            }
            <h3 style={{textAlign: 'center', marginTop: '25px'}}>Comments</h3>
            {isCommLoading
                ? <Loader/>
                : <PostPageComments comments={comments}/>
            }
        </div>
    );
}

export default PostPage;
