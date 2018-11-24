const purchasesRouter = require('express').Router()
const Purchase = require('../models/purchase')
const fs = require('fs');
const parse = require('csv-parse')

purchasesRouter.get('/', async (request, response) => {
  const purchases = await Purchase
    .find({})
  response.json(purchases.map(Purchase.format))
})

purchasesRouter.post('/load', async (request, response) => {
  try {
    var Data=[];
    fs.createReadStream('./data.csv')
      .pipe(parse({
        delimiter: ':',
        from_line: 2
      }))
      .on('data', async function(csvrow) {
        //do something with csvrow
        var row = csvrow[0].split(',')
        console.log(row)
        const purchase = new Purchase({
          ean: row[0],
          quantity: row[1],
          userId: row[2]
        })
        const savedPurchase = await purchase.save()
        Data.push(Purchase.format(savedPurchase))
      })
      .on('end',function() {
        //do something wiht csvData
        console.log('done');
        response.json(Data)
      });
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = purchasesRouter