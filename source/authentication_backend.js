// Traditional Authentication (Session Based)

/*
1. post /authenticate with usr & psw
2. response with set-cookie: session = ...
3. post with cookie session = ...
note: Sessions and cookies do not make sense for mobile applications.
*/

// Token-Based Authentication
// A token will be used for authenticating a user for each request to the server (via request headers)
// JWT stands for JSON Web Token (a token format used in authorization headers)
// JWT = header(type) + payload(info) + signature(secret key)

/*
A database query will be made by using this token.
If this token is valid, it will continue.
If not, return a 403 response code (which indicates a forbidden status).
*/

// A token pool is used for sending that token on every form post
// A token is used in authorization headers, and CSRF does not include that information.

var UserSchema = new Schema({
  email: String,
  password: String,
  token: String
});

/*** token-based-auth-backend ***/
app.post('/signup', function(req, res) {
  User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
    if (err) res.json({ type: false, data: "Error occured: " + err });
    else {
      // whenever you make a POST, you will get a JWT token
      if (user) res.json({ type: true, data: user, token: user.token });
      else res.json({ type: false, data: "Incorrect email/password" });
    }
  });
});

app.post('/signin', function(req, res) {
  User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {

    if (err) res.json({ type: false, data: "Error occured: " + err });
    else {
      if (user) res.json({ type: false, data: "User already exists!" });
      else {
        var userModel = new User();
        userModel.email = req.body.email;
        userModel.password = req.body.password;
        userModel.save(function(err, user) {
          user.token = jwt.sign(user, process.env.JWT_SECRET);
          user.save(function(err, user1) {
            res.json({ type: true, data: user1, token: user1.token });
          });
        })
      }
    }

  });
});

//  access a restricted endpoint
app.get('/me', ensureAuthorized, function(req, res) {
  User.findOne({ token: req.token }, function(err, user) {
    if (err) res.json({ type: false, data: "Error occured: " + err });
    else res.json({ type: true, data: user });
  });
});

// A middleware is defined in order to intercept restricted endpoints.
function ensureAuthorized(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else res.send(403);
}
