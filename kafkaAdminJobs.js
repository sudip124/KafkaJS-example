/*const kafka = require('./kafka')

const topicName = process.env.KAFKA_TOPIC
const admin = kafka.admin()

const main = async () => {
  await admin.connect()
  await admin.createTopics({
    topics:  [{ topic: topicName, numPartitions: 2, replicationFactor: 3 }],
    waitForLeaders: true,
  })
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})*/


const kafka = require('./kafkaClient')

const admin = kafka.admin()

async function createTopic(topic)
{
  await admin.connect()
  let status = await admin.createTopics({
    topics:  [{ topic: topic, numPartitions: 2, replicationFactor: 3 }],
    waitForLeaders: true,
  })
  await admin.disconnect()
  console.log('Status of createTopic: ' + status)
}

async function listTopics()
{
  let topics = await admin.listTopics()
  console.log('List of topics: \n' + topics.toString())
}

async function deleteTopic(topic)
{
  await admin.connect()
  let status = await admin.deleteTopics({topics: topic})
  await admin.disconnect()
  console.log('Delete Topic status: ' + status)
}

createTopic(process.env.KAFKA_TOPIC);
/*const topicArray = new Array("Sudip-Hello-World");
deleteTopic(topicArray);*/
//listTopics();

 