const router = require('express').Router()
const Purchase = require('../models/purchase')
const fs = require('fs')
const parse = require('csv-parse')
const cache = require('../utils/cacheMiddleware')

router.get('/', async (request, response) => {
    const purchases = await Purchase
        .find({})
    response.json(purchases.map(Purchase.format))
})

router.post('/load', async (request, response) => {
    try {
        const data = []
        fs.createReadStream('./data.csv')
            .pipe(parse({
                delimiter: ':',
                from_line: 2,
            }))
            .on('data', async function(csvrow) {
                //do something with csvrow
                const row = csvrow[0].split(',')
                console.log(row)
                const purchase = new Purchase({
                    ean: row[0],
                    quantity: row[1],
                    userId: row[3],
                    personAgeGroup: row[2]
                })
                const savedPurchase = await purchase.save()
                data.push(Purchase.format(savedPurchase))
            })
            .on('end', function() {
                //do something wiht csvData
                console.log('done')
                response.json(data)
            })
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

router.get('/getDomesticRatio/:userId', cache, async (req, res) => {
    const { userId } = req.params
    const purchases = await Purchase.find({
        userId,
    })
        .populate('ean')
        .exec()
    const mapped = purchases.map(Purchase.format)
    const all = mapped.reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const domestic = mapped.filter((p) => p.ean && p.ean.isDomestic).reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const ratio = domestic / all
    res.send(ratio.toString())
})

router.get('/getEuropeanRatio/:userId', cache, async (req, res) => {
    const { userId } = req.params
    const purchases = await Purchase.find({
        userId,
    })
        .populate('ean')
        .exec()
    const mapped = purchases.map(Purchase.format)
    const all = mapped.reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const domestic = mapped.filter((p) => p.ean && p.ean.isEuropean).reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const ratio = domestic / all
    res.send(ratio.toString())
})

router.get('/getDomesticRatioForAgeGroup/:ageGroup', cache, async (req, res) => {
    /**
     * This code is slower than the Wi-Fi at the venue but in the real implementation this would be
     * run in the background and the result would be saved into the database
     */
    const { ageGroup } = req.params
    const purchases = await Purchase.find({
        personAgeGroup: ageGroup
    })
        .populate('ean')
        .exec()
    const mapped = purchases.map(Purchase.format)
    const all = mapped.reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const domestic = mapped.filter((p) => p.ean && p.ean.isDomestic).reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const ratio = domestic / all
    res.send(ratio.toString())
})

router.get('/getEuropeanRatioForAgeGroup/:ageGroup', cache, async (req, res) => {
    /**
     * This code is slower than the Wi-Fi at the venue but in the real implementation this would be
     * run in the background and the result would be saved into the database
     */
    const { ageGroup } = req.params
    const purchases = await Purchase.find({
        personAgeGroup: ageGroup
    })
        .populate('ean')
        .exec()
    const mapped = purchases.map(Purchase.format)
    const all = mapped.reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const domestic = mapped.filter((p) => p.ean && p.ean.isEuropean).reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const ratio = domestic / all
    res.send(ratio.toString())
})

router.get('/getDomesticRatioForAll', cache, async (req, res) => {
    /**
     * This code is slower than the Wi-Fi at the venue but in the real implementation this would be
     * run in the background and the result would be saved into the database
     */
    const purchases = await Purchase.find({})
        .populate('ean')
        .exec()
    const mapped = purchases.map(Purchase.format)
    const all = mapped.reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const domestic = mapped.filter((p) => p.ean && p.ean.isDomestic).reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const ratio = domestic / all
    res.send(ratio.toString())
})

router.get('/getEuropeanRatioForAll', cache, async (req, res) => {
    /**
     * This code is slower than the Wi-Fi at the venue but in the real implementation this would be
     * run in the background and the result would be saved into the database
     */
    const purchases = await Purchase.find({})
        .populate('ean')
        .exec()
    const mapped = purchases.map(Purchase.format)
    const all = mapped.reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const domestic = mapped.filter((p) => p.ean && p.ean.isEuropean).reduce((acc, val) => acc + parseFloat(val.quantity), 0)
    const ratio = domestic / all
    res.send(ratio.toString())
})

module.exports = router