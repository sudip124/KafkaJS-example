require('dotenv').config()
const { Kafka } = require('kafkajs')
/** */
//const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env

const username = process.env.KAFKA_USERNAME
const password = process.env.KAFKA_PASSWORD
const sasl = username && password ? { username, password, mechanism: 'plain' } : null
const ssl = !!sasl
//console.log('process.env.CLUSTER: ' + process.env.password)
// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: process.env.clientId,
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVER],
  ssl,
  sasl
})

module.exports = kafka
