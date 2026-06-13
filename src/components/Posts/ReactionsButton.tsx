import React from 'react'
import { useDispatch } from 'react-redux'
import { setReactions } from '../../state/slices/postsSlice';

const ReactionsButton = ({post}) => {
    const dispatch = useDispatch();

    const reactionsEmoji = {
        thumpsUp : '&& thums',
        wow: '00 wow',
        heart: '<> heart'
    }

    // reactionsEmoji is a Object i need enteries bith key and value 
    const reactBtns = Object.entries(reactionsEmoji).map(([key, emoji]) => {
        return (
            <button type="button" key={key} onClick={() => {dispatch(setReactions({postId: post?.id, reaction : key }))}}>
                {emoji}{post.reactions[key]}
            </button>
        )
    })
  return (
    <div>{reactBtns}</div>
  )
}

export default ReactionsButton