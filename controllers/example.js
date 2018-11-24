const exampleRouter = require('express').Router()
var fs = require('fs');
var parse = require('csv-parse');

exampleRouter.get('/', async (req, res) => {
  var csvData=[];
  fs.createReadStream('./data.csv')
    .pipe(parse({
      delimiter: ':',
      from_line: 2
    }))
    .on('data', function(csvrow) {
      console.log(csvrow)
      //do something with csvrow
      var row = csvrow[0].split(',')
      csvData.push({
        EAN: row[0],
        Quantity: row[1],
        userId: row[2],
      });
    })
    .on('end',function() {
      //do something wiht csvData
      console.log('done');
      res.send(csvData)
    });
})

module.exports = exampleRouter