import { useState } from "react";

export default function CreateComment({
  post,
  newComment,
  setNewComment,
  title,
  username,
}) {
  const [text, setText] = useState("");

  async function comment() {
    if (text != "") {
      await fetch("http://localhost:3001/" + title, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          add: true,
          text: text,
          post: post,
          name: username,
        }),
      });
    }
    setNewComment(!newComment);
  }
  return (
    <>
      <div className="new-comment">
        <input
          className="new-label"
          placeholder="Add a new comment..."
          value={text}
          onChange={function (e) {
            setText(e.target.value);
          }}
        />
        <div>
          <button className="comm-btn" onClick={comment}>
            Comment
          </button>
        </div>
      </div>
    </>
  );
}
