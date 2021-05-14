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

app.use(articlesRouter);

app.listen(port, () => {
  console.log(`The server is start ${port}`);
});
