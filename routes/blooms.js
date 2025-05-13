const express = require('express')
const router =express.Router()
const {
    getBlooms,
    getPBlooms,
    deleteBloom,
    createBloom,
    editBloom,
}=require('../controllers/bloomController')
const requireAuth = require('../middleware/requireAuth')
//router.use(requireAuth)//if user has to access all the following routes, he need to authorized first
router.get('/',getBlooms)

router.post('/',requireAuth,createBloom)
router.get('/:username',requireAuth,getPBlooms)
router.delete('/:id',requireAuth,deleteBloom)
router.patch('/:id',requireAuth,editBloom)
module.exports = router