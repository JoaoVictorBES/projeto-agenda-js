exports.paginaInicial = (req, res) => {
   // está renderizando o template html
    res.render('index',{
        titulo: 'Este sera o tirulo',
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]   
    });
   return;
};

exports.trataPost = (req, res) => {
    res.send(req.body);
    return;
};