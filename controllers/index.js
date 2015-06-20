var exports = module.exports = {};

exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

exports.signin = function(req, res, next) {
  var user = User.findOne(req.params.id, function(err, user) {
    if (err) {
      console.log("Error: " + err);
      res.json(err);
    } else {
      res.json(user);
    };
  })
};

