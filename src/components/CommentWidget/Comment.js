import { useState } from "react";
import Avataar from "../Avataar";
import CommentForm from "./CommentForm";
const Comment = ({
  comment,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  editComment,
  deleteComment,
  parentId = null,
  currentUserInfo,
  getReplies,
}) => {
  const [isEditComment, setIsEditComment] = useState(false)
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const replyId = parentId ? parentId : comment.id;
  const canEditDelete = currentUserInfo.id === comment.userId;
  return (
    <div key={comment.id} className="comment-container">
      <div className="comment">
        <Avataar name={currentUserInfo.name} />
        <div className="comment-content">
          {!isEditComment && (
            <div className="comment-body">
              <div className="comment-body-header">
                <div className="user-name">{currentUserInfo.name}</div>
                <div className="time-passed">{new Date(comment.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="comment-text">{comment.body}</div>
            </div>
          )}
          {isEditComment && (
            <CommentForm
              profileIcon={false}
              submitLabel="Update"
              hasCancelButton
              handleSubmit={(text) => {
                editComment(text, comment.id)
                setIsEditComment(false)
              }}
              currentUserInfo={currentUserInfo}
              handleCancel={() => {
                setIsEditComment(false)
              }}
              parentId={comment.id}
              initialText={comment.body}
            />
          )}
          {!isEditComment && !isReplying && (
            <div className="comment-actions">
              <div
                className="action-text "
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
              {canEditDelete && (
                <>
                  <div> | </div>
                  <div
                    className="action-text "
                    onClick={() =>
                      deleteComment(comment.id)
                    }
                  >
                    Delete
                  </div>
                  <div> | </div>
                  <div
                    className="action-text "
                    onClick={() => setIsEditComment(true)}
                  >
                    Edit
                  </div>
                </>
              )}
            </div>
          )}

          <div className="reply-container">
            {replies.length > 0 && (
              <div className="replies">
                {replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    replies={getReplies(reply.id)}
                    activeComment={activeComment}
                    setActiveComment={setActiveComment}
                    addComment={addComment}
                    editComment={editComment}
                    deleteComment={deleteComment}
                    currentUserInfo={currentUserInfo}
                    getReplies={getReplies}
                    parentId={reply.id}
                  />
                ))}
              </div>
            )}
            {isReplying && (
              <CommentForm
                submitLabel="Reply"
                hasCancelButton
                handleSubmit={(text) => addComment(text, replyId)}
                currentUserInfo={currentUserInfo}
                handleCancel={() => {
                  setActiveComment(null);
                }}
                parentId={comment.id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
