const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();
const secret = process.env.SECRET;
console.log(secret);

const {
  users,
  articlesSch,
  comments,
  suggestions,
  roles,
} = require("./schema");
const port = 5000;

app.use(express.json());
const articlesRouter = express.Router();
const usersRouter = express.Router();

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  users
    .findOne({ email })
    .populate("role", "role permissions ")
    .exec()
    .then((result) => {
      if (!result) {
        return res.json({ message: "The email doesn't exist", status: 404 });
      }
      const payload = {
        userId: result._id,
        country: result.country,
        role: {
          role: result.role.role,
          permissions: result.role.permissions,
        },
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
// getAllArtrses
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
  const { firstName, lastName, age, country, email, password, role } = req.body;
  const newUser = new users({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    role,
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

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (err) {
      res.status(401);
      return res.json({ massge: "the token is invalid", status: 401 });
    }
    if (result) {
      req.token = result;
      console.log(result);
      next();
    }
  });
};

// Create a closure function
// {
//   userId: '60a5f64c91858052b8961d35',
//   country: 'Yemen',
//   role: { role: 'Admin', permissions: [ 'MANAGE_USERS', 'CREATE_COMMENTS' ] },
//   iat: 1621489237,
//   exp: 1621492837
// }
const authorization = (str) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.json({ massge: "the token is invalid", status: 401 });
      }
      if (result) {
        const permissions = result.role.permissions;
        console.log("permissions", permissions);
        if (permissions.indexOf(str) > -1) {
          return next();
        }
        return res.json({ message: "forbidden ", status: 403 });
      }
    });
  };
};

app.post(
  "/articles/:id/comments",
  authentication,
  authorization("CREATE_COMMENTS"),
  async (req, res) => {
    const articleId = req.params.id;
    const { comment, commenter } = req.body;
    const newComment = new comments({
      comment,
      commenter,
    });

    newComment
      .save()
      .then((resultComment) => {
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
  }
);

// createNewSuggestion
app.post("/articles/:id/suggestions", (req, res) => {
  const articleId = req.params.id;
  const { suggestion, proposed } = req.body;
  const newSugg = new suggestions({
    suggestion,
    proposed,
  });
  newSugg
    .save()
    .then((resultSugg) => {
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

app.post("/roles", (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new roles({
    role,
    permissions,
  });
  newRole
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
