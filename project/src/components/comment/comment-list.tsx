import React from 'react';
import Comment from './comment';
import {CommentsType} from '../../types/ofer-card';

type CommentListProps = {
  comments: CommentsType;
};


function CommentList({comments}:CommentListProps) {
  return (
    <>
      {comments.map((comment,id)=>{
        const keyValueOffer = `${id}-${comment}`;
        return (
          <li key={keyValueOffer} className="reviews__item">
            <Comment comment={comment}/>
          </li>);
      })}
    </>
  );
}

export default CommentList;
