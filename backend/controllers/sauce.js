const fs = require('fs')
const Sauce = require('../models/Sauce')

, Utils = require('../middlewares/Utils.class')
, _ = new Utils()



/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

exports.createsauce = (req, res, next) => {
  console.log(req.file)
  console.log(req.body)
  console.log(req.auth.userId);
  // const sauceObject = JSON.parse(req.body.sauce)
  const sauceObject = req.body.sauce
  delete sauceObject._userId;
  console.log(req.protocol);
  console.log(req.file);
  const sauce = new Sauce({
      ...sauceObject
      , userId: req.auth.userId
      , imageUrl: req.file
          ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
          : "http://localhost:3000/images/void.jpg"
  })
  sauce.save()

  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
}

/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

exports.getAllsauce = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces)
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}
exports.getOnesauce = (req, res, next) => {
  console.log('getOnesauce')
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      console.log(req.auth.userId)
      console.log(sauce)
      res.status(200).json(sauce)
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )
}

/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

exports.modifysauce = (req, res, next) => {
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }

  delete sauceObject._userId
  Sauce.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'})
          } else {
              Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }))
          }
      })
      .catch((error) => {
          res.status(400).json({ error })
      })
}

/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

exports.deletesauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'})
          } else if(sauce.imageUrl.indexOf("void") == -1) {
              const filename = sauce.imageUrl.split('/images/')[1]
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }))
              })
          }else Sauce.deleteOne({_id: req.params.id})
                  .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                  .catch(error => res.status(401).json({ error }))
      })
      .catch( error => {
          res.status(500).json({ error })
      })
}

/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

exports.likesauce = (req, res, next) => {
  console.log('likesauce: '+req.params.id)
  // console.log(req.body)
  // console.log(req.auth.userId)

  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      console.log(sauce)
      console.log(req.body)
      let {usersLiked,usersDisliked,likes,dislikes} = sauce
      , disliked = usersDisliked.includes(req.auth.userId)
      , liked = usersLiked.includes(req.auth.userId)
      , {like} = req.body
      if(like == 0) {
        sauce.likes = liked ? likes -1 : likes
        sauce.dislikes = disliked ? dislikes -1 : dislikes
        console.log("0")
        console.log(sauce.usersLiked.filter(v => v!=req.auth.userId))
        sauce.usersLiked = sauce.usersLiked.filter(v => v!=req.auth.userId)
        sauce.usersDisliked = sauce.usersDisliked.filter(v => v!=req.auth.userId)
      }
      if(like == 1){
        console.log("1")
        sauce.usersLiked.push(req.auth.userId)
        sauce.likes++
      }
      if(like == -1){
        console.log("-1")
        console.log(sauce.usersDisliked);
        sauce.usersDisliked.push(req.auth.userId)
        console.log(sauce.usersDisliked);
        sauce.dislikes++
      }

      // let a = {...({likes,dislikes,usersLiked,usersDisliked} = sauce._doc)}
      // console.log(a,sauce)
      console.log("req.auth.userId")
      console.log({ _id: req.auth.userId})
      console.log({ _id: req.params.id})
      console.log(sauce)
      console.log(sauce._doc)
      console.log("req.params.id")

      Sauce.updateOne({ _id: req.params.id}, { ...({likes,dislikes,usersLiked,usersDisliked} = sauce._doc)})
      .then(() => res.status(201).json({message : 'Vote pris en compte!'}))
      .catch(error => res.status(401).json({ error }))

    }
  ).catch(
    (error) => {
      res.status(403).json({
        error: error
      })
    }
  )
}

/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */

/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
exports.getAll = (req, res, next) => {
  /*SNIPPET REQUEST BODY*/
  // ner_body
  /*SNIPPET MONGOOSE CRUD*/
  // necmfind
  /*SNIPPET express res*/
  res.status(200).json(Data)
  
}

exports.updateMenu = (req, res, next) => {
  res.json({message: "le controlleur pour cette action ('update') n'a pas encore été codé"})
}
exports.deleteMenu = (req, res, next) => {
  res.status(201).json({message: "le controlleur pour cette action ('delete') n'a pas encore été codé"})
}
exports.addMenu = (req, res, next) => {
  console.log(req.body);

  //RÉCUPÉRER DES DONNÉES AVANT DE LES SUPPRIMER, SI NÉCESSAIRE 
  let nom_restau = Object.keys(req.body)[0]
  , lieu_restau = Object.keys(req.body)[1]
  delete req.body[lieu_restau]
  //TRAITER LES DONNÉES POUR POUVOIR LES INSÉRER AU BON ENDROIT DANS LE FICHIER MODEL sauce.js
  sauce.menus.carte = {...sauce.menus.carte, ...req.body}
  //LES ÉCRIRE DANS UN FICHIER
  let buffer = new Buffer.from("const sauce = "+JSON.stringify(sauce));
  fs.open("models/sauce.js", "w", function(err, fd) {
      if(err) {
          console.log('Cant open file');
      }else {
          fs.write(fd, buffer, 0, buffer.length, 
                  null, function(err,writtenbytes) {
              if(err) {
                  console.log('Cant write to file');
              }else {
                  console.log(writtenbytes +
                      ' characters added to file');
              }
          })
      }
  })
  //RENVOYER LA RÉPONSE
  res.status(200).json({message:"Données créées avec succès"})
}
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
/************************************************************************************************************ */
