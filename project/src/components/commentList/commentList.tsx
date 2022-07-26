import React from 'react';
import {CommentType} from '../../types/Offer';
import Comment from '../comment/comment';

type CommentListProps = {
  comments: CommentType[];
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
