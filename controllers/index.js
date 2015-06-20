var exports = module.exports = {};

/* GET home page. */
exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

exports.sign_in = function(req, res, next) {
  console.log("success");
};

