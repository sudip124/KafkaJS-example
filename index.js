require('dotenv').config()
const express = require('express')
const kafkaProducer = require('./kafkaProducer')
const app = express()
const port = process.env.SERVER_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log(JSON.stringify(req.query))
  res.send('Hello World!')
})

app.post('/searchFlickr', (req, res) => {
  let response = 'Total count: ';
  const searchedMessage = req.body.searchedMessage
  if (searchedMessage != undefined) {
    kafkaProducer.searchFlickr(searchedMessage, function (totalCount){
      response+= totalCount
      console.log("Coming back to success callback: " + totalCount)
      res.send(response)
    }, errorCallback)
  } else {
    res.send('Some error happened')
  }
})

app.post('/secret', (req, res) => {
  res.send('POST request to the homepage')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function errorCallback(error) {
  console.log("Some error happened: " + error)
}