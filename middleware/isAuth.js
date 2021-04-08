const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = (req,res, next) => {
   const AuthHeader = req.headers.authorization;

   if(!AuthHeader){
     req.isAuth = false;
     return next();
   }

   const token = AuthHeader.split(' ')[1];
   if(!token || token === ''){
    req.isAuth = false;
    return next();
   }

   // @var declearation
   try {
     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, function(err, decoded) {
      if (err) {
        const message = err.name === 'JsonWebTokenErr' ? 'Unauthorized' : err.message
        return next(createError(message));
      }
      req.userData = decoded;
    });
   } catch (error) {
     req.isAuth = false;
     return next();
   }

  req.isAuth = true;
  next();
}
