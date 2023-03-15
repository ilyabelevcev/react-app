import React, { useMemo, useState, useEffect } from 'react';
import PostFilter from './components/PostFilter';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import axios from 'axios';
import './styles/App.css'

const App = () => {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})

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
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    
    return (
        <div className="app">
            <PostForm create={createPost}/>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter 
                filter={filter} 
                setFilter={setFilter}
            />
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="List of posts 1"/>
        </div>
    );
}

export default App;
