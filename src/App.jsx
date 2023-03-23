import React, { useMemo, useState, useEffect } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import axios from 'axios';
import './styles/App.css'

const App = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, []);

    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a,b) => a[filter.sort].localeCompare(b[filter.sort]))
        } else {
            return posts
        }
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])

    async function fetchPosts(limit, page) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page,
            }
        })
        setPosts(response.data)
    }

    const createPost = (newPost) => {
        setPosts([newPost, ...posts])
        setModal(false)
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    
    return (
        <div className="app">
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <MyButton onClick={() => setModal(true)}>Add post</MyButton>
            <PostFilter 
                filter={filter} 
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts 1"/>
        </div>
    );
}

export default App;
