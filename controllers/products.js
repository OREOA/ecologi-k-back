const router = require('express').Router()
const Product = require('../models/product')

router.get('/:ean', async (req, res) => {
    const { ean } = req.params
    const product = await Product.findOne({
        ean,
    })
    res.json(Product.format(product))
})

module.exports = router
