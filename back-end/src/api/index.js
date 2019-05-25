import express from 'express';

import getAbout from './about';
import getAccomodation from './accomodation';
import getAdmin from './admin';
import getAttraction from './attraction';
import getContact from './contact';
import getDashboard from './dashboard';
import getFAQ from './faq';
import getPayment from './payment';
import passport from '../middleware';

const app = express();

app.get('/about', getAbout.get);
app.get('/accommodation', getAccomodation.get);
app.get('/admin', getAdmin.get);
app.get('/admin/login', getAdmin.login);
app.get('/attraction', getAttraction.get);
app.get('/contact', getContact.get);
app.get('/dashboard', getDashboard.get);
app.get('/faq', getFAQ.get);
app.get('/payment', getPayment.get);

app.post('/login/admin', passport.authenticate('local'), (req, res) => {

  req.session.key = req.body.email;
  console.log(req);
  //console.log(req.session);
  //console.log(res.session);

  res.json({data:'hihi'});
});
function checkAuthentication(req,res,next){
  console.log(req);
  if(req.isAuthenticated()){
    // req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect('/logout');
  }
}
// eslint-disable-next-line no-unused-vars
app.get('/some_path', checkAuthentication, (req, res) => {
  // do something only if user is authenticated
  res.send('done well');
});

app.get('/logout',function(req,res){
  req.session.destroy(function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});


export default app;
