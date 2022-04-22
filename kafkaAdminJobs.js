const kafka = require('./kafkaClient')
const admin = kafka.admin()

const KafkaAdminJobs = {
  createTopic : async (topic) => {
    return new Promise(async function (resolve, reject){
      await admin.connect()
      let status = await admin.createTopics({
        topics:  [{ topic: topic, numPartitions: 2, replicationFactor: 3 }],
        waitForLeaders: true,
      })
      await admin.disconnect()
      if (status) {
        resolve("successful")
      } else {
        reject("Some Error happened")
      }
      console.log('Status of createTopic: ' + status)
    })
  },
  deleteTopic : async (topic) => {
    return new Promise(async function (resolve, reject){
      try {
        await admin.connect()
        const topicArray = new Array(topic)
        let status = await admin.deleteTopics({topics: topicArray})
        await admin.disconnect()
        resolve("successful")
      }
      catch (error) {
        console.log(error)
        reject("Unable to delete topic: " + topic)
      }
    })
    
  },
  listTopics : async () => {
    return new Promise(async function (resolve, reject){
      let topics = await admin.listTopics()
      if (topics != undefined) {
        resolve(topics);
      } else {
        reject("Some Error happened")
      }
    })
  }
  /*listTopics : async () => {
    let topics = await admin.listTopics()
    console.log('List of topics: ' + topics.toString())
  }*/
}
module.exports.KafkaAdminJobs = KafkaAdminJobs

//createTopic(process.env.KAFKA_TOPIC);
/*const topicArray = new Array("Sudip-Hello-World");
deleteTopic(topicArray);*/
//listTopics();

 