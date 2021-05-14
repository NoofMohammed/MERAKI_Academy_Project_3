const express = require("express");

const app = express();
const port = 5000;

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
  console.log(author, 9999);
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

app.use(articlesRouter);
app.listen(port, () => {
  console.log(`The server is start ${port}`);
});
