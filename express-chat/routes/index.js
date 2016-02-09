//var User = require('models/user').User;
//var HttpError = require('error').HttpError;
//var ObjectID = require('mongodb').ObjectID;
//module.exports = function(app) {
//app.get('/', function(req, res){
//  res.render('index', { title: 'VINTIZER' })
//});
//
//
//app.get('/users', function(req,res,next) {
//  User.find({}, function(err,users) {
//    if(err) throw err;
//    res.json(users);
//  })
//});
//
//app.get('/user/:id', function(req,res,next){
//
//  try {
//    var id = new ObjectID(req.params.id);
//  } catch (e) {
//    next(404);
//  }
//  //console.log("id", id);
//  //console.log("req.params.id", ObjectID(req.params.id));
//  User.findById(req.params.id, function(err, user) {
//    if (err) return next();
//    if(!user) {
//      next(new HttpError(404, 'user not found'));
//    }
//    res.json(user);
//  })
//});
//};
module.exports = function(app) {
  app.get("/", require('./frontpage').get);

  app.get("/login", require('./login').get);

  app.get("/chat", require('./chat').get);
};