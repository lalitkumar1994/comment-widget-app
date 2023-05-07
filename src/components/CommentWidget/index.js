import { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { createComment } from "../../commmentApi";

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

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      const updatedBackendComments = comments.filter(
        (backendComment) => backendComment.id !== commentId
      );
      setComments(updatedBackendComments);
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
