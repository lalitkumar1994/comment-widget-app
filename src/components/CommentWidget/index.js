import { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { createComment, updateComment } from "../../commmentApi";

const Comments = ({ currentUserInfo }) => {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    createComment(text, parentId, currentUserInfo.id).then((comment) => {
      setComments([comment, ...comments]);
      setActiveComment(null);
    });
  };

  const editComment = (text, commentId) => {
    updateComment(text).then((data) => {
      const { body, updatedAt} = data;
      const updatedComments = comments.map((comment) => {
          if(comment.id === commentId) {
            comment.body = body;
            comment.updatedAt = updatedAt;
          }
          return comment
      });
      setComments(updatedComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
      setActiveComment(null);
    }
  };

  return (
    <div className="comments">
      <br/>
      <h5>Comments</h5>
      <br/>
      <CommentForm currentUserInfo={currentUserInfo} submitLabel="Post" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            editComment={editComment}
            deleteComment={deleteComment}
            currentUserInfo={currentUserInfo}
            getReplies={getReplies}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
