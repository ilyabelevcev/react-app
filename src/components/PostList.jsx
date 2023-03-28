import React from "react";
import PostItem from './PostItem'
import { CSSTransition, TransitionGroup } from "react-transition-group";

const PostList = ({posts, title, remove}) => {

    if(!posts.length) {
        return(
            <h1 style={{textAlign: "center"}}>Posts not found</h1>
        )
    }

    return(
        <ul className="post__list">
            <h1 style={{textAlign: "center"}}>
                {title}
            </h1>
            <TransitionGroup>
                {posts.map((post, index)=>
                    <CSSTransition
                        key={post.id}
                        timeout={600}
                        classNames='post__list-item'
                    >
                        <PostItem remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </ul>
    )
}

export default PostList;