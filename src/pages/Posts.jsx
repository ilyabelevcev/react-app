import React, { useState, useEffect, useRef } from 'react';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import MySelect from '../components/UI/select/MySelect';
import Loader from '../components/UI/loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';

import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';

import '../styles/App.sass'
import PostService from '../API/PostService';
import { getPageCount } from '../utils/pages';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef()

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(page, limit)
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([newPost, ...posts])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page)
    }
    
    return (
        <div className="posts">
            <MyButton onClick={() => setModal(true)} style={{marginTop: '15px'}}>Add post</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0px'}}/>
            <PostFilter 
                filter={filter} 
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Number of items per page'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'All'},
                ]}
            />
            {postError &&
                <h1 style={{textAlign: 'center'}}>{postError}</h1>
            }
            <PostList title="List of posts 1" remove={removePost} posts={sortedAndSearchedPosts} /> 
            {isLoading && 
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
            }
            <hr ref={lastElement} style={{margin: '15px 0px'}}/>
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;
