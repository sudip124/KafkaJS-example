const axios = require('axios');
//const createHookReceiver = require('npm-hook-receiver')
const kafka = require('./kafka')

const producer = kafka.producer()
const apiURL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&text=test&format=json&nojsoncallback=1';

const main = async () => {

  console.log('process.env.KAFKA_TOPIC: ' + process.env.KAFKA_TOPIC)

  /*try {
    axios.get(apiURL);
  }catch(err) {
    console.log(err);

  }*/
  await producer.connect()
  try {
      
      const responses = await producer.send({
          topic: process.env.KAFKA_TOPIC,
          messages: [
              { key: 'key3', value: 'hello world again', partition: 0 },
              { key: 'key4', value: 'hey hey random', partition: 1 }
          ],
      })
      console.log('Published message', { responses })

  } catch (error) {
      console.error('Error publishing message', error)
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
