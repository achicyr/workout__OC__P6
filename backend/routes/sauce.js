const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')
const sauceCtrl = require('../controllers/sauce')

router.get('/', auth, sauceCtrl.getAllsauce)
router.post('/', auth, multer, sauceCtrl.createsauce)
router.get('/:id', auth, sauceCtrl.getOnesauce)
router.put('/:id', auth, multer, sauceCtrl.modifysauce)
router.delete('/:id', auth, sauceCtrl.deletesauce)
router.post('/:id/like', auth, sauceCtrl.likesauce)

module.exports = router