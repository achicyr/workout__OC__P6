const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log("111");
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() =>{
                console.log("222");
                return res.status(201).json({ message: 'Utilisateur créé !' })
            })
          .catch(error => {
                console.log("333");
                console.log(Object.keys(error.errors.email));
                console.log(typeof error.errors.email);
                console.log(error.errors.email);
                // console.log(error.errors);
                // res.status(400).json({ error })}
                res.status(400).json({ error })}
            );
      })
      .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};