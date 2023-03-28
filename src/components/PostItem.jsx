import React from "react";
import MyButton from "./UI/button/MyButton";
import {useNavigate} from 'react-router-dom'

const PostItem = (props) => {
    const navigate =  useNavigate()

    return (
        <li className='post__list-item'>
            <div className="post__item-content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>
                    {props.post.body}    
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open</MyButton>
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </li>
    )
}

export default PostItem