import { useState } from "react";
import Avataar from "../Avataar";

const CommentForm = ({
  handleSubmit,
  parentId= null,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  currentUserInfo,
  profileIcon = true,
}) => {
  const [text, setText] = useState(initialText);
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text, parentId);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        {profileIcon && <Avataar name={currentUserInfo.name} />}
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="comment-form-button" disabled={text.length === 0}>
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="comment-form-button comment-form-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
