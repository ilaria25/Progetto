import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";
const uri = process.env.MONGODB_CONNECTION_STRING;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function login(username, password) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("users")
      .findOne({ username, password });
    return [res != null, res];
  } finally {
    await client.close();
  }
}

export async function roles() {
  try {
    await client.connect();
    const res = await client.db("project").collection("users").find().toArray();
    return res;
  } finally {
    await client.close();
  }
}

export async function register(username, password) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("users")
      .insertOne({ username, password });
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

// ---------------------------------------------------------

// GET POSTS

export async function getPostsO() {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("OnePiece")
      .find({})
      .toArray();
    console.log(res);
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function getPostsN() {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("Naruto")
      .find({})
      .toArray();
    console.log(res);
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function getPostsA() {
  try {
    await client.connect();
    const res = await client.db("project").collection("AoT").find({}).toArray();
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function getPostsB() {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("Bleach")
      .find({})
      .toArray();
    console.log(res);
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function getPostsM() {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("MyHeroAcademia")
      .find({})
      .toArray();
    console.log(res);
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function getPostsJ() {
  try {
    await client.connect();
    const res = await client.db("project").collection("Jjk").find({}).toArray();
    console.log(res);
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function getPostsD() {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("DemonSlayer")
      .find({})
      .toArray();
    return [true, res];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

// ---------------------------------------------------------

// INSERT COMMENTS

export async function updateCommentJ(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("Jjk")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function updateCommentA(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("AoT")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function updateCommentO(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("OnePiece")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function updateCommentB(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("Bleach")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function updateCommentN(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("Naruto")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function updateCommentM(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("MyHeroAcademia")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function updateCommentD(comment) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("DemonSlayer")
      .updateOne({ post: comment.post }, { $set: comment });
    return [true, res.modifiedCount];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

// ---------------------------------------------------------

// CREATE POSTS

export async function addPostO(post) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("OnePiece")
      .insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function addPostA(post) {
  try {
    await client.connect();
    const res = await client.db("project").collection("AoT").insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function addPostN(post) {
  try {
    await client.connect();
    const res = await client.db("project").collection("Naruto").insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function addPostB(post) {
  try {
    await client.connect();
    const res = await client.db("project").collection("Bleach").insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function addPostJ(post) {
  try {
    await client.connect();
    const res = await client.db("project").collection("Jjk").insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function addPostD(post) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("DemonSlayer")
      .insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}

export async function addPostM(post) {
  try {
    await client.connect();
    const res = await client
      .db("project")
      .collection("MyHeroAcademia")
      .insertOne(post);
    return [true, res.insertedId];
  } catch (err) {
    return [false, err];
  } finally {
    await client.close();
  }
}
