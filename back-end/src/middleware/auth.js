const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    // redirect to login page if user is not authenticated
    res.redirect('/admin');
  }
};

export default checkAuthentication;
