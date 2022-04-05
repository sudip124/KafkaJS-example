const axios = require('axios');
//const createHookReceiver = require('npm-hook-receiver')
const kafka = require('./kafkaClient')
//require('dotenv').config()

const producer = kafka.producer()

async function publishtoKafka(item) {
  //console.log('item.id: ' + item.id);
  await producer.connect()
  try {
      
      const responses = await producer.send({
          topic: process.env.KAFKA_TOPIC,
          messages: [
              { key: item.id, value: item.owner, partition: 0 }
          ],
      })
      console.log('Published message', { responses })

  } catch (error) {
      console.error('Error publishing message', error)
  }
}
const main = async () => {

  console.log('process.env.FLICKR_URL: ' + process.env.FLICKR_URL)

  try {
    axios.get(process.env.FLICKR_URL + 'test')
    .then(response => {
      console.log('NUmber of record counts: ' + response.data.photos.total)
      let photoArray = response.data.photos.photo
      photoArray.forEach(publishtoKafka)
      /*photoArray.forEach(element => {
        console.log(element.id);
      });*/
    })
    .catch(error => {
      console.log('Unable to call Flikr API: ' + error);
    });
  }
  catch(err) {
    console.log(err);

  }

  
    
    
  /*const server = createHookReceiver({
    // Secret created when registering the webhook with NPM.
    // Used to validate the payload. 
    secret: "HOOK_SECRET=very-secret-string",

    // Path for the handler to be mounted on.
    mount: '/hook'
  })

  server.on('package:publish', async event => {
    // Send message to Kafka
    try {
    const responses = await producer.send({
      topic: "Sudip-Hello-World",
      messages: [{
        // Name of the published package as key, to make sure that we process events in order
        key: event.name,

        // The message value is just bytes to Kafka, so we need to serialize our JavaScript
        // object to a JSON string. Other serialization methods like Avro are available.
        value: JSON.stringify({
          package: event.name,
          version: event.version
        })
      }]
    })

    console.log('Published message', { responses })
  } catch (error) {
    console.error('Error publishing message', error)
  }
  })

  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`)
  })*/
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
