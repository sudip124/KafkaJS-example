const kafka = require('./kafkaClient')
const producer = kafka.producer()
const axios = require('axios');

async function publishtoKafka(item) {
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
const searchService = {
    searchFlickr : async function (searchMessage, resolve, reject) {
        let totalCount = 0
        try {
          axios.get(process.env.FLICKR_URL + searchMessage)
          .then(response => {
            totalCount = response.data.photos.total
            console.log('Number of record counts in returned by Flickr: ' + totalCount + " for search text: " + searchMessage)
            let photoArray = response.data.photos.photo
            photoArray.forEach(publishtoKafka)
            /*photoArray.forEach(element => {
              console.log(element.id);
            });*/
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
}

module.exports.searchService = searchService