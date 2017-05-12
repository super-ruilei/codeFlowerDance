/*
Article	create Article        POST /articles with Payload
update Article                PUT /articles/123 with Payload
delete Article                DELETE /articles/123
view Article	                GET /article/123

Comment	create Comment        POST /articles/123/comments with Payload
update Coment                 PUT /comments/123 with Payload
delete Comment                DELETE /comments/123
view Comment                  GET /comments/123

User	create User             POST /users with Payload
update User                   PUT /users/123 with Payload
delete User                   DELETE /users/123
view User	                    GET /users/123
*/

// Article
var ArticleSchema = new Schema({
  title: String,
  slug: String,
  content: String,
  author: {
    type: String,
    ref: "User"
  }
});
// Comment
var CommentSchema = new Schema({
  text: String,
  article: {
    type: String,
    ref: "Article"
  },
  author: {
    type: String,
    ref: "User"
  }
});

// NodeJS with Restify
server.use(restify.fullResponse())
  .use(restify.bodyParser());

// Article Start
// User URI instead of query string. /articles/123  (Good), /articles?id=123 (Bad).
server.post("/articles", controllers.article.createArticle)
server.put("/articles/:id", controllers.article.updateArticle)
server.del("/articles/:id", controllers.article.deleteArticle)
server.get({ path: "/articles/:id", version: "1.0.0" }, controllers.article.viewArticle)
server.get({ path: "/articles/:id", version: "2.0.0" }, controllers.article.viewArticle_v2)

// Comment Start
// Use noun for your resources. You can use HTTP methods in order to operate on resources.
server.post("/comments", controllers.comment.createComment)
server.put("/comments/:id", controllers.comment.viewComment)
server.del("/comments/:id", controllers.comment.deleteComment)
server.get("/comments/:id", controllers.comment.viewComment)

// Article Controller
exports.createArticle = function(req, res, next) {
  var articleModel = new Article(req.body);
  articleModel.save(function(err, article) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: "Error occured: " + err
      })
    } else {
      res.json({
        type: true,
        data: article // article with generated ID ?
      })
    }
  })
}

exports.viewArticle = function(req, res, next) {
  Article.findById(new ObjectId(req.params.id), function(err, article) {
    if (err) {
      res.status(500);
      res.json({ type: false, data: "Error occured: " + err });
    } else {
      if (article) res.json({ type: true, data: article });
      else res.json({ type: false, data: "Article: " + req.params.id + " not found" });
    }
  })
}
