import express from "express";
import bodyParser from "body-parser";
import {
  login,
  register,
  getPostsJ,
  getPostsN,
  getPostsA,
  getPostsO,
  getPostsD,
  getPostsM,
  getPostsB,
  updateCommentJ,
  updateCommentA,
  updateCommentO,
  updateCommentB,
  updateCommentM,
  updateCommentN,
  updateCommentD,
  addPostO,
  addPostN,
  addPostA,
  addPostB,
  addPostD,
  addPostJ,
  addPostM,
} from "./db.js";

const app = express();
const port = 3001;
app.use(bodyParser.json());

import cookieParser from "cookie-parser";
app.use(cookieParser());

import cors from "cors";
const corsOption = { origin: "http://localhost:3000", credentials: true };
app.use(cors(corsOption));

import session from "express-session";

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: "secretpassage",
    cookie: { secure: false },
  })
);

app.get("/login", (req, res) => {
  if (req.session.logged) {
    res.status(200).json({ username: req.session.username });
  } else {
    res.status(400).json({ msg: "retry login" });
  }
});

app.post("/login", async (req, res) => {
  let [exist, resp] = await login(req.body.username, req.body.password);
  if (exist) {
    let id = resp._id.toString();
    req.session.logged = true;
    req.session.username = req.body.username;
    res.status(200).json({
      msg: "ok",
    });
  } else {
    res.status(401).json({ msg: "error" });
  }
});

app.post("/create", async (req, res) => {
  const [rec, output] = await register(req.body.username, req.body.password);
  if (rec) {
    res.status(200).json({ msg: output });
  } else {
    res.status(401).json({ msg: "error " });
  }
});

app.put("/login", (req, res) => {
  req.session.logged = false;
  req.session.username = "";
  res.status(200).json({ msg: "succesfull logout" });
});

// -----------------------------------------------------------

// anime get

app.get("/onepiece", async (req, res) => {
  let [found, posts] = await getPostsO();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.get("/naruto", async (req, res) => {
  let [found, posts] = await getPostsN();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.get("/aot", async (req, res) => {
  let [found, posts] = await getPostsA();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.get("/bleach", async (req, res) => {
  let [found, posts] = await getPostsB();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.get("/myheroacademia", async (req, res) => {
  let [found, posts] = await getPostsM();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.get("/jjk", async (req, res) => {
  let [found, posts] = await getPostsJ();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.get("/demonslayer", async (req, res) => {
  let [found, posts] = await getPostsD();
  if (found) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

// -----------------------------------------------------------

// anime put (aggiunge comments e li cancella)

app.put("/jjk", async (req, res) => {
  let [found, post] = await getPostsJ();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentJ(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.put("/aot", async (req, res) => {
  let [found, post] = await getPostsA();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentA(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.put("/naruto", async (req, res) => {
  let [found, post] = await getPostsN();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentN(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.put("/onepiece", async (req, res) => {
  let [found, post] = await getPostsO();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentO(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.put("/bleach", async (req, res) => {
  let [found, post] = await getPostsB();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentB(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.put("/myheroacademia", async (req, res) => {
  let [found, post] = await getPostsM();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentM(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.put("/demonslayer", async (req, res) => {
  let [found, post] = await getPostsD();
  if (found) {
    let selectedPost;
    if (req.body.add) {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = [
            ...post[i].comments,
            { text: req.body.text, name: req.body.name },
          ];
          selectedPost = post[i];
        }
      }
    } else {
      for (let i = 0; i < post.length; i++) {
        if (post[i].post == req.body.post) {
          post[i].comments = post[i].comments.filter(
            (element) => element.name != req.body.name
          );
          selectedPost = post[i];
        }
      }
    }
    let [success, data] = await updateCommentD(selectedPost);
    if (success) {
      res.status(200).json({ data });
    } else {
      res.status(400).json({ data });
    }
  } else {
    res.status(400).json({ msg: "error" });
  }
});

// -----------------------------------------------------------

// anime post (aggiunge posts e li cancella)

app.post("/onepiece", async (req, res) => {
  let [success, data] = await addPostO(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.post("/naruto", async (req, res) => {
  let [success, data] = await addPostN(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.post("/aot", async (req, res) => {
  let [success, data] = await addPostA(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.post("/bleach", async (req, res) => {
  let [success, data] = await addPostB(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.post("/jjk", async (req, res) => {
  let [success, data] = await addPostJ(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.post("/demonslayer", async (req, res) => {
  let [success, data] = await addPostD(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.post("/myheroacademia", async (req, res) => {
  let [success, data] = await addPostM(req.body);
  if (success) {
    res.status(200).json({ data });
  } else {
    res.status(400).json({ msg: "error" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port} `);
});
