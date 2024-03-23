
exports.meuMiddleware = (req, res, next) => {
    res.locals.umaVariavelLocal = 'Este é o valor da variavel'
    next();
}

exports.outroMiddleware = (req, res, next) => {
    next();
}
module.exports = (req, res, next) => {
    console.log();
    console.log('Paseei no middleware global');
    console.log();

    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code){
        return res.render('./views/includes/404');
    } 
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  };