const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies["x-auth-token"];
  
    if (!token) {
      // return res.status(401).send("Unauthorized");
      return res.redirect('/login');
    }
    try {
      const decodedToken = jwt.verify(token, "secretkey");
  
      req.user = decodedToken;
      res.locals.user = decodedToken;
  
      next();
    } catch (err) {
      res.status(400).send(err.message);
    }
};