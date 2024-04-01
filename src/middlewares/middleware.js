
exports.meuMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.errors = req.flash('success');
    next();
}

exports.outroMiddleware = (req, res, next) => {
    next();
}
module.exports = (req, res, next) => {
    console.log();
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err){
        return res.render('./views/includes/404');
    } 

    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  };