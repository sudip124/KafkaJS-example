const kafka = require('./kafkaClient')

const consumer = kafka.consumer({
  groupId: "sudip-group"
})

const main = async () => {
  await consumer.connect()

  await consumer.subscribe({
    topic: "Sudip-Hello-World",
    fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('Received message', {
        topic,
        partition,
        key: message.key.toString(),
        value: message.value.toString()
      })
    }
  })
}

main().catch(async error => {
  console.error('Some error happened:' + error)
  try {
    await consumer.disconnect()
  } catch (e) {
    console.error('Failed to gracefully disconnect consumer', e)
  }
  process.exit(1)
})
