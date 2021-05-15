const express = require("express");

const app = express();
const port = 5000;

const { uuid } = require("uuidv4");

app.use(express.json());
const articlesRouter = express.Router();

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
  res.status(200);
  res.json(articles);
});

articlesRouter.get("/articles/search_1", (req, res) => {
  const author = req.query.author;
  const article = articles.filter((elem) => {
    return elem.author === author;
  });
  res.status(200);
  res.json(article);
});

articlesRouter.get("/articles/:id", (req, res) => {
  const id = req.params.id;
  const artic = articles.find((elem) => {
    return elem.id === Number(id);
  });
  res.status(200);
  res.json(artic);
});

articlesRouter.post("/articles", (req, res) => {
  const article = req.body;
  article.id = uuid();
  articles.push(article);
  res.status(201);
  res.json(articles);
});
articlesRouter.put("/articles/:id", (req, res) => {
  const id = req.params.id;
  const objBody = req.body;
  let article = {};
  for (let i = 0; i < articles.length; i++) {
    if (id == articles[i].id) {
      article = { ...articles[i], ...objBody };
      articles[i] = article;
    }
  }
  res.status(200);
  res.json(articles);
});

articlesRouter.delete("/articles/:id", (req, res) => {
  let result = {};

  const id = req.params.id;
  for (let i = 0; i < articles.length; i++) {
    if (id == articles[i].id) {
      articles.splice(i, 1);
      result = {
        success: "true",
        massage: `Success Delete article with ${id}`,
      };
    }
  }
  res.status(200);
  res.json(result);
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

app.use(articlesRouter);
app.listen(port, () => {
  console.log(`The server is start ${port}`);
});
