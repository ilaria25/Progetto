import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const navigate = useNavigate();
  const [msgCreated, setMsgCreated] = useState("");
  const [createdError, setCreatedError] = useState(false);

  useEffect(() => {
    async function logged() {
      let res = await fetch("http://localhost:3001/login", {
        credentials: "include",
      });
      if (res.status === 200) {
        navigate("/Homepage");
      } else {
        navigate("/");
      }
    }
    logged();
  }, []);

  async function login() {
    let res = await fetch("http://localhost:3001/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    let json = await res.json();
    if (res.status === 401) {
      setTextError("wrong username or password");
      setError(true);
    } else {
      setError(false);
      navigate("/Homepage");
    }
  }

  async function create() {
    if (password.length >= 8) {
      let res = await fetch("http://localhost:3001/create", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 401) {
        setMsgCreated("username already exists");
        setCreatedError(true);
      } else {
        setCreatedError(false);
      }
    } else {
      setMsgCreated("invalid username or password");
      setCreatedError(true);
    }
  }

  return (
    <>
      <header className="login-header">
        <span>
          <h1 className="title">NerdRum.com</h1>
        </span>
      </header>
      <main className="login-main">
        <div className="login">
          <input
            className="placeholder"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className="placeholder"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {error && <p className="err-msg">{textError}</p>}
          <button className="buttons" onClick={login}>
            Login
          </button>
          {createdError && <p className="err-msg">{msgCreated}</p>}
          <button className="buttons" onClick={create}>
            Create
          </button>
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
    </>
  );
}
