const kafka = require('./kafkaClient')
const producer = kafka.producer()

async function kafkaProducer(message, messageKey) {
    return new Promise(async function (resolve, reject){
        await producer.connect()
        try {
            const responses = await producer.send({
                topic: process.env.KAFKA_TOPIC,
                messages: [
                    { key: messageKey, value: message, partition: 0 }
                ],
            })
            resolve({ responses })
        } catch (error) {
            console.error('Error publishing message', error)
            reject(error)
    }
    })
}
module.exports.kafkaProducer = kafkaProducer

