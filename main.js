const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();

const { users, articlesSch, comments, suggestions } = require("./schema");
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
const secret = process.env.SECRET;
// 1.login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  users.findOne({ email }).then((result) => {
    console.log({ result });
    if (!result) {
      return res.json({ message: "The email doesn't exist", status: 404 });
    }
    const payload = {
      userId: result._id,
      country: result.country,
    };
    const options = { expiresIn: "60m" };

    const token = jwt.sign(payload, secret, options);

    bcrypt.compare(password, result.password, (err, resultPassword) => {
      if (resultPassword === true) {
        res.json({ token: token });
      } else {
        return res.json({
          message: "The password you’ve entered is incorrect",
          status: 403,
        });
      }
    });
  });
});
// createNewComment

app.post("/articles/:id/comments", async (req, res) => {
  const articleId = req.params.id;
  const { comment, commenter } = req.body;
  const newComment = new comments({
    comment,
    commenter,
  });

  newComment
    .save()
    .then((resultComment) => {
      console.log(resultComment._id, "artile");

      articlesSch
        .updateOne(
          { _id: articleId },
          { $push: { comment: resultComment._id } }
        )
        .exec();
      res.status(201);
      res.json(resultComment);
    })
    .catch((err) => {
      res.send(err);
    });
});

// createNewSuggestion
app.post("/articles/:id/suggestions", (req, res) => {
  console.log(777777);
  const articleId = req.params.id;
  const { suggestion, proposed } = req.body;
  const newSugg = new suggestions({
    suggestion,
    proposed,
  });
  newSugg
    .save()
    .then((resultSugg) => {
      console.log(resultSugg._id);
      articlesSch
        .updateOne(
          { _id: articleId },
          { $push: { suggestion: resultSugg._id } }
        )
        .exec();
      res.status(201);
      res.json(resultSugg);
    })
    .catch((err) => {
      res.status(401);
      res.json(err);
    });
});

// createNewAuthor [Level 1]:

// login [Level 1]

app.use(articlesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`The server is start ${port}`);
});
