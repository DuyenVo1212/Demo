const express = require('express')
const router = express.Router()

const {
    getAllCandleafs, getSingleCandleaf
} = require('../controllers/candleafs')

router.route('/').get(getAllCandleafs)
router.route('/:id').get(getSingleCandleaf)

module.exports = router
