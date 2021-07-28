const passwordSchema = require('../models/password');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.writeHead(400, 'Le mot de passe doit contenir entre 8 et 16 caractères, sans espaces avec 1 chiffre minimum, des majuscules et minuscules',
         {'content-type': 'application/json'});
        res.end('Le format du mot de passe est incorrect.');
    } else {
        next();
    }
};