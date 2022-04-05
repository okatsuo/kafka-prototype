import { Kafka } from 'kafkajs'

if (!process.env.BROKER) throw new Error('Kafka broker is needed')

const kafka = new Kafka({
  clientId: process.env.KAFKACLIENTID ?? 'test',
  brokers: [process.env.BROKER],
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