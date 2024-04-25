import { useState } from "react";

export default function CreatePost({ newPost, setNewPost, title }) {
  const [post, setPost] = useState("");

  async function publish() {
    if (post != "") {
      await fetch("http://localhost:3001/" + title, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: post,
          comments: [],
        }),
      });
    }
    setNewPost(!newPost);
  }
  return (
    <>
      <div className="posts">
        <div className="post-spaces">
          <input
            className="label"
            type="text"
            placeholder="Write a post..."
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <button className="post-btn" onClick={publish}>
            Post
          </button>
        </div>
      </div>
    </>
  );
}
