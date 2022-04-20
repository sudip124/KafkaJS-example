const axios = require('axios');
const kafka = require('./kafkaClient')

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
async function searchFlickr (searchMessage, resolve, reject) {

  let totalCount = 0
  try {
    axios.get(process.env.FLICKR_URL + searchMessage)
    .then(response => {
      totalCount = response.data.photos.total
      console.log('Number of record counts in kafkaproducer: ' + totalCount)
      let photoArray = response.data.photos.photo
      //photoArray.forEach(publishtoKafka)
      photoArray.forEach(element => {
        console.log(element.id);
      });
      resolve(totalCount)
    })
    .catch(error => {
      console.log('Unable to call Flikr API: ' + error);
      reject(error)
    });
  }
  catch(err) {
    console.log(err)
    reject(error)
  }
}

module.exports.searchFlickr = searchFlickr



