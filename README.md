# So Pekocko

*So Pekocko est une entreprise familiale de 10 salariés. Son activité principale est la création de sauces piquantes dont la composition est tenue secrète. Forte de son succès, l’entreprise souhaite se développer et créer une application web, dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres.*

---
## Installation

sudo npm install -g @angular/cli

git clone https://github.com/olive-webdev/OlivierBlachere_6_22072021.git

* cd frontend 
* npm install
* ng serve

http://localhost:4200

* cd backend
* npm install
* nodemon server

---
## Exigences concernant la sécurité :

* l’API doit respecter le RGPD et les standards OWASP ;
* le mot de passe des utilisateurs doit être chiffré ;
* 2 types de droits administrateur à la base de données doivent être définis : un accès
pour supprimer ou modifier des tables, et un accès pour éditer le contenu de la base
de données ;
* la sécurité de la base de données MongoDB (à partir d’un service tel que MongoDB Atlas) doit être faite de telle sorte que le validateur puisse lancer l’application depuis sa machine ;
* l’authentification est renforcée sur les routes requises ;
* les mots de passe sont stockés de manière sécurisée ;
* les adresses mails de la base de données sont uniques et un plugin Mongoose
approprié est utilisé pour s’assurer de leur caractère unique et rapporter des erreurs.

---
## Erreurs API
Toute erreur doit être renvoyée telle quelle, sans aucune modification ni ajout. Si nécessaire, utiliser une nouvelle Erreur().

---
## Routes API
Toutes les routes relatives à la sauce doivent exiger une demande authentifiée (contenant un jeton valide dans son en-tête d'autorisation : "Bearer <token<token>>").

---
## Liste des modules implémentés :
1. express
1. mongoose
1. body-parser
1. path
1. helmet
1. dotenv
1. mongoose-unique-validator
1. password-validator
1. multer
1. jsonwebtoken
1. bcrypt
1. email-validator
1. crypto
1. mongo-sanitize
1. fs
1. express-rate-limit
