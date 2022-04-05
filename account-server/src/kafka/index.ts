import { Kafka } from 'kafkajs'

const kafka = new Kafka({
  clientId: process.env.KAFKACLIENTID ?? 'test',
  brokers: [process.env.BROKER ?? 'localhost:9092'],
  ...(process.env.KAFKAUSERNAME && {
    sasl: {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKAUSERNAME ?? '',
      password: process.env.KAFKAPASSWORD ?? ''
    }
  })
})

export const kafkaProducer = kafka.producer()
kafkaProducer.connect().then(() => console.log('[Account-Server] - Producer connected'))