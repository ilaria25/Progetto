import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateComment from "../CreateComment";
import CreatePost from "../CreatePost";

export default function OnePiece() {
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState(false);
  useEffect(() => {
    async function getPostsO() {
      let res = await fetch("http://localhost:3001/onepiece", {
        method: "GET",
      });
      let json = await res.json();
      if (res.status === 200) {
        setPosts(json.posts);
      }
    }
    getPostsO();
  }, [newComment]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function call() {
      let res = await fetch("http://localhost:3001/login", {
        credentials: "include",
      });
      let json = await res.json();

      if (res.status === 200) {
        setUsername(json.username);
      } else {
        navigate("/");
      }
    }
    call();
  }, []);

  async function logout() {
    await fetch("http://localhost:3001/login", {
      method: "PUT",
      credentials: "include",
    });
    navigate("/");
  }

  async function deleteComment(post) {
    await fetch("http://localhost:3001/onepiece", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        add: false,
        post: post,
        name: username,
      }),
    });
    setNewComment(!newComment);
  }

  return (
    <body>
      <header className="header">
        <span>
          <h1 className="title">NerdRum.com</h1>
        </span>
        <span>
          <nav>
            <ul className="nav-menu">
              <a href="./Homepage" className="pages">
                Home
              </a>
              <a href="./Contacts" className="pages">
                Contacts
              </a>
            </ul>
          </nav>
        </span>
        <span className="button">
          {username}
          <button onClick={logout}>Logout</button>
        </span>
        <div className="top-menu">
          <nav>
            <ul className="list">
              <li>
                <a href="../OnePiece" className="pages">
                  One Piece
                </a>
              </li>
              <li>
                <a href="../Naruto" className="pages">
                  Naruto
                </a>
              </li>
              <li>
                <a href="../AoT" className="pages">
                  Attack On Titan
                </a>
              </li>
              <li>
                <a href="../Bleach" className="pages">
                  Bleach
                </a>
              </li>
              <li>
                <a href="../MyHeroAcademia" className="pages">
                  My Hero Academia
                </a>
              </li>
              <li>
                <a href="../Jjk" className="pages">
                  Jujutsu Kaisen
                </a>
              </li>
              <li>
                <a href="../DemonSlayer" className="pages">
                  Demon Slayer
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-body">
        <div className="content">
          <CreatePost
            title="onepiece"
            newPost={newComment}
            setNewPost={setNewComment}
          ></CreatePost>
          <div className="posts">
            {posts.length > 0 &&
              posts.map((el) => {
                return (
                  <div>
                    <h1 className="post-title">{el.post}</h1>
                    {el.comments.map((element) => {
                      if (element.name == username) {
                        return (
                          <div className="comment-section">
                            <h6 className="user">{element.name}</h6>
                            <div className="new-com">
                              <p className="comment-text">{element.text}</p>
                            </div>
                            <div>
                              <button
                                className="delete-btn"
                                onClick={() => {
                                  deleteComment(el.post);
                                }}
                                s
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="comment-section">
                            <h6 className="user">{element.name}</h6>
                            <p className="comment-text">{element.text}</p>
                          </div>
                        );
                      }
                    })}
                    <CreateComment
                      title="onepiece"
                      username={username}
                      post={el.post}
                      newComment={newComment}
                      setNewComment={setNewComment}
                    ></CreateComment>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <footer className="footer">
        <p className="privacy">
          @Our Privacy Policy Generator can help you generate a customized
          Privacy Policy in around three minutes, for free. <br></br>
          Our Terms & Conditions Generator can help you generate a customized
          Terms & Conditions agreement in around three minutes, for free.
          <br></br>
        </p>
      </footer>
    </body>
  );
}
