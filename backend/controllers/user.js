const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validator = require("email-validator");

const crypto = require('crypto');

var key = crypto.createHash("sha256").update("openclassrooms", "ascii").digest();
var iv = "1234567890123456";


exports.signup = (req, res, next) => {
    const emailIsValid = validator.validate(req.body.email);

    if(!emailIsValid){
        res.writeHead(400, 'Email non reconnu',
        {'content-type': 'application/json'});
        res.end("Le format de l'email est incorrect.")
    }
    else {
        bcrypt.hash(req.body.password, 10)
        .then((hash) => {

            const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
            cipher.update(req.body.password, "ascii");
            const encryptedEmail = cipher.final("base64");

            const user = new User({ email: encryptedEmail, password: hash });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch(() => res.status(400).json({ error: "Erreur création utilisateur" }));
        })
        .catch((error) => res.status(500).json({ error }));
    } 
};

exports.login = (req, res, next) => {

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    cipher.update(req.body.password, "ascii");
    const encryptedEmail = cipher.final("base64");

    User.findOne({ email: encryptedEmail })
        .then((user) => {
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" });
        }
        bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
            if (!valid) {
                return res.status(401).json({ error: "Mot de passe incorrect !" });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                    expiresIn: "1h",
                }),
                });
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};


