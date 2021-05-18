const express = require("express");
const db = require("./db");

const app = express();

const { users, articlesSch, comments,suggestion} = require("./schema");
const port = 5000;

app.use(express.json());
const articlesRouter = express.Router();
const usersRouter = express.Router();
// getAllArticles
articlesRouter.get("/articles", (req, res) => {
  articlesSch
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
// getArticlesByAuthor
articlesRouter.get("/articles/search_1", async (req, res) => {
  const firstName = req.query.author;
  const author = await users.findOne({ firstName });

  articlesSch
    .find({ author: author._id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
// getAnArticleById
articlesRouter.get("/articles/search_2/:id", (req, res) => {
  const _id = req.params.id;

  articlesSch
    .findOne({ _id })
    .populate("author", "firstName ")
    .exec()
    .then((result) => {
      res.send(result);
    });
});

articlesRouter.post("/articles", (req, res) => {
  const { title, description, authorId } = req.body;
  const newArticles = new articlesSch({
    title,
    description,
    author: authorId,
  });
  newArticles
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// updateAnArticleById
articlesRouter.put("/articles/:id", (req, res) => {
  const _id = req.params.id;
  const { title, description, authorId } = req.body;
  articlesSch
    .findOneAndUpdate(
      { _id },
      { title, description, author: authorId },
      { new: true }
    )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//deleteArticleById
articlesRouter.delete("/articles/:id", async (req, res) => {
  const _id = req.params.id;
  articlesSch
    .findOneAndRemove({ _id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// deleteArticlesByAuthor
articlesRouter.delete("/articles", async (req, res) => {
  const firstName = req.body.author;
  const author = await users.findOne({ firstName });

  const authorId = author.id;
  articlesSch
    .deleteMany({ author: authorId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/users", (req, res) => {
  const { firstName, lastName, age, country, email, password } = req.body;
  const newUser = new users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
// 1.login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  users
    .findOne({ password, email })

    .then((result) => {
      if (result) {
        res.status(200);
        res.json("Valid login credentials");
      } else {
        res.status(401);
        res.json("Invalid login credentials");
        ("Invalid login credentials");
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
// createNewComment

app.post("/articles/:id/comments", async (req, res) => {
  const articleId = req.params.id;
  const article = await articlesSch.findOne({ _id: articleId });
  const { comment, commenter } = req.body;
  const newComment = new comments({
    comment,
    commenter,
  });

  newComment
    .save()
    .then((resultComment) => {
      // article.comment.push(resultComment._id).save();
      console.log(resultComment._id, article);

      articlesSch.updateOne(
        { _id: articleId },
        { $push: { comment: [resultComment._id] } }
      );
      res.status(201);
      res.json(resultComment);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.use(articlesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`The server is start ${port}`);
});
