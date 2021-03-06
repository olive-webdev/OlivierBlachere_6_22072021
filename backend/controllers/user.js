const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validator = require("email-validator");

const crypto = require("crypto");

var key = crypto
  .createHash("sha256")
  .update(process.env.CRYPTOKEY, "ascii")
  .digest();
var iv = process.env.CRYPTOIV;

const sanitize = require("mongo-sanitize");

exports.signup = (req, res, next) => {
  const emailIsValid = validator.validate(sanitize(req.body.email));

  if (!emailIsValid) {
    res.writeHead(400, "Email incorrect", {
      "content-type": "application/json",
    });
    res.end("Le format de l'email est incorrect.");
  } else {
    bcrypt
      .hash(sanitize(req.body.password), 10) // hashage du mot de passe
      .then((hash) => {
        const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); // cryptage de l'email
        cipher.update(sanitize(req.body.email), "ascii");
        const encryptedEmail = cipher.final("base64");

        const user = new User({ email: encryptedEmail, password: hash });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch(() => res.status(400).json({ error })
          );
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv); // cryptage de l'email
  cipher.update(sanitize(req.body.email), "ascii");
  const encryptedEmail = cipher.final("base64");

  User.findOne({ email: encryptedEmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(sanitize(req.body.password), user.password) // comparaison du mot de passe utilisateur avec le hash en base de données
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: "1h",}), // renvoie le token signé
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Pour décrypter
// const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
// decipher.update(encryptedEmail, "base64");
// console.log("Decrypted: %s", decipher.final("ascii"));
