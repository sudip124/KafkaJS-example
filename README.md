# Project Title
Publishing and consuming messages in Kafka

## Description
A simple Kafka client using KafkaJS library to produce and consume data from a Kafka cluster. The client exposes a set of REST APIS to create and delete kafka topics and kafka messages.

Following APIS are made available:
### / GET
Provides a list of Kafka topics

### / POST
Publishes a message in kakfa. Following variables need to be passed as query param:
message
messageKey (optional)

### /topic POST
Creates a new topic. Following variable needs to be passed in body:
topicName

### /topic DELETE
Deletes a topic. Following variable needs to be passed in body:
topicName

### /searchFlickr POST
Searches flickr with a search word and posts the list of image id in kafka. Following variable needs to be passed:
searchedMessage

## Dependencies
Node JS followed by npm packages:
axios
dotenv
express
kafkajs
nodemon

### Prerequisites
The following set of environment variables needs to be set up for dotenv to pick up
KAFKA_USERNAME
KAFKA_PASSWORD
KAFKA_TOPIC
KAFKA_BOOTSTRAP_SERVER
KAFKA_GROUP_ID
CLIENT_ID
FLICKR_URL
SERVER_PORT

## Get Running
Run the command npm install --save

## Authors
Sudip Pal

## License
Apache 2.0


