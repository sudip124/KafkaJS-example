# Required connection configs for Kafka producer, consumer, and admin 
bootstrap.servers=pkc-e8mp5.eu-west-1.aws.confluent.cloud:9092 
security.protocol=SASL_SSL 
sasl.jaas.config=org.apache.kafka.common.security.plain.PlainLoginModule 
required username='{{ CLUSTER_API_KEY }}' 
password='{{ CLUSTER_API_SECRET }}'; 
sasl.mechanism=PLAIN 

# Required for correctness in Apache Kafka clients prior to 2.6 
client.dns.lookup=use_all_dns_ips 

# Best practice for higher availability in Apache Kafka clients prior to 3.0 
session.timeout.ms=45000 

# Best practice for Kafka producer to prevent data loss 
acks=all 

# Required connection configs for Confluent Cloud Schema Registry 
schema.registry.url=https://psrc-o268o.eu-central-1.aws.confluent.cloud 
basic.auth.credentials.source=USER_INFO 
basic.auth.user.info={{ SR_API_KEY }}:{{ SR_API_SECRET }}