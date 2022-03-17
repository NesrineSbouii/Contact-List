const protectRoute = (req, res, next) => {
  console.log(req.user)
  if (req.isAuthenticated()) {
    return next();
  }else{
    res.redirect('/login');
  }
}
const allowIf = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/home');
}
module.exports = {
  protectRoute,
  allowIf,
};