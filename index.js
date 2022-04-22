require('dotenv').config()
const express = require('express')
const searchService = require('./searchService')
const KafkaAdminJobs = require('./kafkaAdminJobs').KafkaAdminJobs
const kafkaProducer = require('./kafkaProducer')
const app = express()
const port = process.env.SERVER_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log("Coming to / GET")
  KafkaAdminJobs.listTopics().then(function (response) {
    res.send('List of Kafka topics are: ' + response)  
  })
  .catch(error => {
    res.send('Error happened: ' + error);
  })
})


app.post('/', function(req, res) {
  const message = req.query.message
  let messageKey = req.query.messageKey
  if (messageKey == undefined) {
    let currentdate = new Date()
    messageKey = currentdate.getDate() + ''
    + (currentdate.getMonth()+1) 
    + currentdate.getFullYear() + ''
    + currentdate.getHours()  
    + currentdate.getMinutes() 
    + currentdate.getSeconds()
  }
  kafkaProducer.kafkaProducer(message,messageKey).then(function (resonse) {
    res.send(resonse)
  }).catch (error => {
    res.send("Error happened:" + error)})
})

app.post('/searchFlickr', (req, res) => {
  let response = 'Total count: ';
  let searchedMessage = req.query.searchedMessage
  if (searchedMessage == undefined){
    searchedMessage = req.body.searchedMessage
  }  
  if (searchedMessage != undefined) {
    searchService.searchService.searchFlickr(searchedMessage, function (totalCount){
      response+= totalCount
      res.send(response)
    }, function (error) {
      console.log("Some error happened: " + error)
      res.send('Some error happened')
    })
  } else {
    res.send('No search string found')
  }
})

app.post('/topic', (req, res) => {
  const topicName = req.body.topicName
  KafkaAdminJobs.createTopic(topicName).then(function (response) {
    res.send("Status:" + response)
  })
  .catch(error => {
    res.send("Error happened:" + error)
  })
})

app.delete('/topic', (req, res) => {
  console.log("Coming to /topic DELETE")
  const topicName = req.body.topicName
  KafkaAdminJobs.deleteTopic(topicName).then(function (response) {
    res.send("Status:" + response)
  })
  .catch(error => {
    res.send("Error happened:" + error)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

