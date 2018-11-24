const uploaderRouter = require('express').Router()
const parse = require('csv-parse')
const request = require('request')

uploaderRouter.get('/', async (req, res) => {
  var csvData = []
  var headers = []
  var firstLine = true
  request(req.query.url, function (error, response, body) {
    try {
      parse(body, {
        delimiter: ':',
        from_line: 1
      })
        .on('data', function (csvrow) {
          console.log(csvrow)
          //do something with csvrow
          var row = csvrow[0].split(',')
          if (firstLine) {
            headers = row
            firstLine = false
          } else {
            var purchase = {}
            for (var i = 0; i < headers.length; i++) {
              purchase[headers[i]] = row[i]
            }
            csvData.push(purchase);
          }
        })
        .on('end', function () {
          //do something wiht csvData
          console.log('done');
          res.send(csvData)
        })
    }catch (exception) {
      console.log(exception)
      res.status(500).json({ error: 'something went wrong...' })
    }
  });
})


module.exports = uploaderRouter