const express = require("express");
const db = require("./db");

const app = express();

const { users, articlesSch } = require("./schema");
const port = 5000;

const { uuid } = require("uuidv4");

app.use(express.json());
const articlesRouter = express.Router();
const usersRouter = express.Router();

const articles = [
  {
    id: 1,
    title: "How I learn coding?",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
  {
    id: 2,
    title: "Coding Best Practices",
    description: "Lorem, ipsum dolor sit, Quam, mollitia.",
    author: "Besslan",
  },
  {
    id: 3,
    title: "Debugging",
    description: "Lorem, Quam, mollitia.",
    author: "Jouza",
  },
];

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

articlesRouter.put("/articles/:id", (req, res) => {
  const _id = req.params.id;
  const { title, description, authorId } = req.body;
  articlesSch
    .findOneAndUpdate({ title, description, author: authorId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

articlesRouter.delete("/articles/:id", (req, res) => {
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

articlesRouter.delete("/articles", (req, res) => {
  let result = {};
  const author = req.body.author;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].author === author) {
      articles.splice(i, 1);
      result = {
        success: "true",
        massage: `Success delete all the articles for the author => ${author}`,
      };
    }
  }
  res.status(200);
  res.json(result);
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

app.use(articlesRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`The server is start ${port}`);
});
