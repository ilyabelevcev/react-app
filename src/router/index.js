import Home from '../pages/Home'
import Posts from '../pages/Posts'
import PostPage from '../pages/PostPage'
import Login from '../pages/Login'

export const privateRoutes = [
    {path: '/', element: <Home/>, exact: true},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostPage/>, exact: true},
] 

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
] 